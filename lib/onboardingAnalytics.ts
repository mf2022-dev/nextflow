/**
 * Analytics tracking for hybrid onboarding
 * Tracks user interactions and provides insights
 */

export interface OnboardingAnalytics {
  // Session data
  sessionId: string;
  startTime: number;
  
  // Mode tracking
  primaryMode: 'code' | 'constellation';
  modesVisited: ('code' | 'constellation')[];
  modeSwitchCount: number;
  
  // Code snippet interactions
  codeInteractions: {
    type: 'read' | 'copy' | 'edit' | 'run';
    timestamp: number;
  }[];
  
  // Constellation interactions
  constellationInteractions: {
    starId: string;
    action: 'hover' | 'click';
    timestamp: number;
  }[];
  
  // Final outcome
  selectedSkillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | null;
  completionTime: number;
  completionMethod: 'code' | 'constellation' | 'skip';
}

class OnboardingAnalyticsService {
  private analytics: OnboardingAnalytics;

  constructor() {
    this.analytics = this.initializeAnalytics();
  }

  private initializeAnalytics(): OnboardingAnalytics {
    return {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      primaryMode: 'code',
      modesVisited: ['code'],
      modeSwitchCount: 0,
      codeInteractions: [],
      constellationInteractions: [],
      selectedSkillLevel: null,
      completionTime: 0,
      completionMethod: 'code'
    };
  }

  private generateSessionId(): string {
    return `onb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track mode switching
  trackModeSwitch(newMode: 'code' | 'constellation'): void {
    if (!this.analytics.modesVisited.includes(newMode)) {
      this.analytics.modesVisited.push(newMode);
    }
    this.analytics.modeSwitchCount++;
    this.saveToLocalStorage();
  }

  // Track code interactions
  trackCodeInteraction(type: 'read' | 'copy' | 'edit' | 'run'): void {
    this.analytics.codeInteractions.push({
      type,
      timestamp: Date.now() - this.analytics.startTime
    });
    this.saveToLocalStorage();
  }

  // Track constellation interactions
  trackConstellationInteraction(starId: string, action: 'hover' | 'click'): void {
    this.analytics.constellationInteractions.push({
      starId,
      action,
      timestamp: Date.now() - this.analytics.startTime
    });
    this.saveToLocalStorage();
  }

  // Complete onboarding
  completeOnboarding(
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert',
    method: 'code' | 'constellation' | 'skip'
  ): void {
    this.analytics.selectedSkillLevel = skillLevel;
    this.analytics.completionTime = Date.now() - this.analytics.startTime;
    this.analytics.completionMethod = method;
    this.saveToLocalStorage();
    this.sendToBackend();
  }

  // Get current analytics
  getAnalytics(): OnboardingAnalytics {
    return { ...this.analytics };
  }

  // Save to localStorage
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bionxa_onboarding_analytics', JSON.stringify(this.analytics));
    }
  }

  // Load from localStorage
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bionxa_onboarding_analytics');
      if (stored) {
        try {
          this.analytics = JSON.parse(stored);
        } catch (error) {
          console.error('Failed to load analytics:', error);
        }
      }
    }
  }

  // Send analytics to backend (placeholder)
  private sendToBackend(): void {
    // TODO: Implement backend API call
    console.log('Onboarding Analytics:', this.analytics);
    
    // Example: Send to analytics service
    // fetch('/api/analytics/onboarding', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(this.analytics)
    // });
  }

  // Get insights
  getInsights(): {
    primaryInteractionMode: 'code' | 'constellation';
    timeToDecision: number;
    explorationScore: number;
    confidence: 'low' | 'medium' | 'high';
  } {
    const totalInteractions = 
      this.analytics.codeInteractions.length + 
      this.analytics.constellationInteractions.length;

    const codeInteractionRatio = 
      this.analytics.codeInteractions.length / (totalInteractions || 1);

    return {
      primaryInteractionMode: codeInteractionRatio > 0.5 ? 'code' : 'constellation',
      timeToDecision: this.analytics.completionTime,
      explorationScore: Math.min(100, totalInteractions * 10),
      confidence: totalInteractions > 5 ? 'high' : totalInteractions > 2 ? 'medium' : 'low'
    };
  }

  // Reset analytics
  reset(): void {
    this.analytics = this.initializeAnalytics();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bionxa_onboarding_analytics');
    }
  }
}

// Singleton instance
let analyticsInstance: OnboardingAnalyticsService | null = null;

export function getOnboardingAnalytics(): OnboardingAnalyticsService {
  if (!analyticsInstance) {
    analyticsInstance = new OnboardingAnalyticsService();
  }
  return analyticsInstance;
}

// Convenience hooks for React components
export function useOnboardingAnalytics() {
  const analytics = getOnboardingAnalytics();

  return {
    trackModeSwitch: (mode: 'code' | 'constellation') => analytics.trackModeSwitch(mode),
    trackCodeInteraction: (type: 'read' | 'copy' | 'edit' | 'run') => analytics.trackCodeInteraction(type),
    trackConstellationInteraction: (starId: string, action: 'hover' | 'click') => 
      analytics.trackConstellationInteraction(starId, action),
    completeOnboarding: (
      skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert',
      method: 'code' | 'constellation' | 'skip'
    ) => analytics.completeOnboarding(skillLevel, method),
    getAnalytics: () => analytics.getAnalytics(),
    getInsights: () => analytics.getInsights()
  };
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface UserProfile {
  skillLevel: SkillLevel
  onboardingCompleted: boolean
  preferences: {
    language: 'en' | 'ar'
    theme: 'light' | 'dark'
    notifications: boolean
  }
  progress: {
    completedTutorials: string[]
    currentPath: string | null
    xp: number
    streak: number
  }
  createdAt: string
  updatedAt: string
}

export interface SkillLevelContent {
  level: SkillLevel
  tutorials: string[]
  recommendedPaths: string[]
  features: string[]
  description: string
}

// Skill level definitions
export const skillLevelDefinitions: Record<SkillLevel, SkillLevelContent> = {
  beginner: {
    level: 'beginner',
    description: 'New to bioinformatics and computational biology',
    tutorials: [
      'intro-to-bioinformatics',
      'linux-basics',
      'first-pipeline',
      'dna-sequencing-intro',
      'basic-file-formats',
    ],
    recommendedPaths: [
      'Bioinformatics Fundamentals',
      'Linux for Beginners',
      'Introduction to Genomics',
    ],
    features: [
      'Step-by-step guided tutorials',
      'Visual explanations',
      'No prior coding experience required',
      'Friendly AI assistant',
    ],
  },
  intermediate: {
    level: 'intermediate',
    description: 'Have some experience with basic bioinformatics',
    tutorials: [
      'rna-seq-analysis',
      'variant-calling',
      'nextflow-basics',
      'quality-control',
      'alignment-techniques',
    ],
    recommendedPaths: [
      'RNA-seq Analysis Pipeline',
      'Variant Calling Workflow',
      'Nextflow Development',
    ],
    features: [
      'Real-world data analysis',
      'Interactive coding exercises',
      'Best practices guidance',
      'Performance optimization tips',
    ],
  },
  advanced: {
    level: 'advanced',
    description: 'Experienced with genomics and pipeline development',
    tutorials: [
      'advanced-nextflow',
      'multi-omics-integration',
      'custom-tool-development',
      'cloud-computing',
      'workflow-optimization',
    ],
    recommendedPaths: [
      'Advanced Pipeline Development',
      'Multi-omics Data Integration',
      'Cloud-scale Bioinformatics',
    ],
    features: [
      'Complex pipeline architectures',
      'Advanced algorithms',
      'Scalability strategies',
      'Research-grade projects',
    ],
  },
  expert: {
    level: 'expert',
    description: 'Professional bioinformatician or researcher',
    tutorials: [
      'algorithm-implementation',
      'large-scale-processing',
      'research-pipelines',
      'contributing-opensource',
      'novel-methods',
    ],
    recommendedPaths: [
      'Cutting-edge Research Methods',
      'Large-scale Data Processing',
      'Open-source Contribution',
    ],
    features: [
      'State-of-the-art techniques',
      'Novel algorithm development',
      'Collaborative research projects',
      'Publication-quality analysis',
    ],
  },
}

// User profile utilities
export const UserProfileUtils = {
  // Get user profile from localStorage
  getProfile(): UserProfile | null {
    if (typeof window === 'undefined') return null
    
    const stored = localStorage.getItem('bionxa_user_profile')
    if (!stored) return null
    
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  },

  // Save user profile to localStorage
  saveProfile(profile: Partial<UserProfile>): void {
    if (typeof window === 'undefined') return
    
    const existing = this.getProfile()
    const updated: UserProfile = {
      ...this.getDefaultProfile(),
      ...existing,
      ...profile,
      updatedAt: new Date().toISOString(),
    }
    
    localStorage.setItem('bionxa_user_profile', JSON.stringify(updated))
  },

  // Get default profile
  getDefaultProfile(): UserProfile {
    return {
      skillLevel: 'beginner',
      onboardingCompleted: false,
      preferences: {
        language: 'en',
        theme: 'dark',
        notifications: true,
      },
      progress: {
        completedTutorials: [],
        currentPath: null,
        xp: 0,
        streak: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  // Update skill level
  updateSkillLevel(level: SkillLevel): void {
    this.saveProfile({ skillLevel: level })
  },

  // Mark onboarding as complete
  completeOnboarding(level: SkillLevel): void {
    this.saveProfile({
      skillLevel: level,
      onboardingCompleted: true,
    })
  },

  // Check if user needs onboarding
  needsOnboarding(): boolean {
    const profile = this.getProfile()
    return !profile || !profile.onboardingCompleted
  },

  // Get content for skill level
  getContentForLevel(level: SkillLevel): SkillLevelContent {
    return skillLevelDefinitions[level]
  },

  // Get recommended tutorials
  getRecommendedTutorials(level: SkillLevel): string[] {
    const content = this.getContentForLevel(level)
    const profile = this.getProfile()
    
    if (!profile) return content.tutorials
    
    // Filter out completed tutorials
    return content.tutorials.filter(
      (id) => !profile.progress.completedTutorials.includes(id)
    )
  },

  // Mark tutorial as completed
  completeTutorial(tutorialId: string): void {
    const profile = this.getProfile()
    if (!profile) return
    
    const completed = new Set(profile.progress.completedTutorials)
    completed.add(tutorialId)
    
    this.saveProfile({
      progress: {
        ...profile.progress,
        completedTutorials: Array.from(completed),
        xp: profile.progress.xp + 100, // Award 100 XP per tutorial
      },
    })
  },

  // Update user streak
  updateStreak(): void {
    const profile = this.getProfile()
    if (!profile) return
    
    const lastUpdate = new Date(profile.updatedAt)
    const now = new Date()
    const hoursSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60)
    
    let newStreak = profile.progress.streak
    
    // If last update was yesterday, increment streak
    if (hoursSinceUpdate >= 20 && hoursSinceUpdate <= 48) {
      newStreak += 1
    }
    // If more than 48 hours, reset streak
    else if (hoursSinceUpdate > 48) {
      newStreak = 1
    }
    
    this.saveProfile({
      progress: {
        ...profile.progress,
        streak: newStreak,
      },
    })
  },

  // Clear profile (for testing or reset)
  clearProfile(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('bionxa_user_profile')
  },
}

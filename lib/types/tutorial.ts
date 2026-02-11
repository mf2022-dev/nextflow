/**
 * Tutorial content type definitions
 */

export type TutorialDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type ContentType = 'text' | 'code' | 'interactive' | 'quiz' | 'video';

export interface CodeBlock {
  language: string;
  code: string;
  explanation?: string;
  editable?: boolean;
  runnable?: boolean;
  expectedOutput?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TutorialSection {
  id: string;
  title: string;
  type: ContentType;
  content: string;
  codeBlock?: CodeBlock;
  quiz?: QuizQuestion[];
  estimatedTime?: number; // in minutes
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: TutorialDifficulty;
  category: string;
  tags: string[];
  author: string;
  duration: number; // in minutes
  xpReward: number;
  prerequisites: string[];
  learningObjectives: string[];
  sections: TutorialSection[];
  resources: {
    title: string;
    url: string;
    type: 'article' | 'video' | 'documentation' | 'tool';
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface TutorialProgress {
  tutorialId: string;
  userId: string;
  completedSections: string[];
  currentSection: string;
  quizScores: { [sectionId: string]: number };
  timeSpent: number;
  completed: boolean;
  completedAt?: string;
  lastAccessedAt: string;
}

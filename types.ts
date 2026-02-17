
// ============================================
// types.ts - COMPLETE WITH R-H SIGNATURE
// ============================================

// ===== EASTER EGG SIGNATURE TYPES =====
export type EggId = 
  | 'egg_splash_secret'
  | 'egg_dashboard_combo'
  | 'egg_badge_hidden'
  | 'egg_streak_magic'
  | 'egg_about_page';

export interface EasterEgg {
  id: EggId;
  title: string;
  hint: string;
  location: string;
  found: boolean;
  emoji?: string;
}

export interface EasterEggService {
  initialize(): Promise<void>;
  isEggFound(eggId: EggId): boolean;
  findEgg(eggId: EggId): Promise<void>;
  getTotalEggsFound(): number;
  getAllEggs(): EasterEgg[];
  resetAllEggs(): Promise<void>;
}

// ===== SIGNATURE CONSTANTS =====
export const SIGNATURE = "Created with 💚 by R-H";
export const SIGNATURE_SHORT = "R-H🤍";

// ===== QUEST TYPES =====
export type QuestType = 'Daily' | 'Weekly' | 'Milestone';
export type QuestCategory = 
  | 'physical'
  | 'mental'
  | 'emotional'
  | 'spiritual'
  | 'social';

export interface Quest {
  id: string;
  title: string;
  intention: string;
  // Note: Flutter example had 'action', but current React app uses 'intention' for description.
  // Keeping 'intention' for consistency, but if 'action' is needed, please specify.
  duration: string; // Changed from number to string to match existing app
  xpReward: number;
  coinReward: number;
  type?: QuestType; // Made optional to match existing app
  category: QuestCategory;
  isCompleted?: boolean;
  completedAt?: Date;
  link?: string;
}

// ===== BADGE TYPES =====
export interface Badge {
  id: string;
  name: string;
  description?: string; // Added description, made optional
  icon: string;
  color: string;
  requiredXp?: number; // Added requiredXp, made optional
  isUnlocked?: boolean;
  unlockedAt?: Date;
}

// ===== WELLNESS TYPES =====
export interface WellnessCategory {
  name: 'Physical' | 'Mental' | 'Emotional' | 'Social' | 'Spiritual' | 'Financial';
  score: number;
  color: string;
  icon: string;
  questsCompleted: number;
}

export interface WellnessWheel {
  categories: WellnessCategory[];
  averageScore: number;
  lastUpdated: Date;
}

// ===== USER TYPES =====
export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  lastActive: Date;
  selectedPaths?: string[];
}

export interface UserStats {
  xp: number;
  level: number;
  coins: number;
  diamonds: number;
  streak: number;
  lastActivityDate?: Date; // Made optional
  totalQuestsCompleted?: number; // Made optional
  totalBadgesUnlocked?: number; // Made optional
  xpMax: number; // Added to match existing app
}

// ===== PARTNER TYPES (VERBLIS) =====
export interface SocialLink {
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'Twitter' | 'LinkedIn';
  url: string;
  handle: string;
  icon: string;
  color: string;
  followers?: number;
}

export interface PartnerVideo {
  id: string; // Changed to id from youtubeId for flexibility, but current constants use youtubeId
  title: string;
  url: string; // Added URL as a direct link option
  duration: string; // Changed to string to match constants
  views?: string; // Changed to string to match constants
  thumbnail?: string;
  category?: QuestCategory; // Made optional
}

export interface PartnerInfo {
  name: string;
  tagline: string;
  email: string;
  website: string;
  logo?: string;
  socialLinks: SocialLink[];
  videos: PartnerVideo[];
}

// ===== SOUND TYPES =====
export type SoundEffect = 
  | 'quest_complete'
  | 'badge_unlock'
  | 'level_up'
  | 'button_click'
  | 'streak_milestone'
  | 'egg_found';

export interface SoundConfig {
  enabled: boolean;
  volume: number;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: Date;
}

// ===== USER SETTINGS =====
export interface UserSettings {
  notifications: {
    enabled: boolean;
    soundEnabled: boolean;
    dailyReminder: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  privacy: {
    dataCollection: boolean;
    shareProgress: boolean;
  };
}

// ===== UTILITY TYPES =====
export type Nullable<T> = T | null | undefined;
export type Awaitable<T> = T | Promise<T>;

// ===== ERROR TYPES =====
export class ZenQuestError extends Error {
  constructor(
    public code: string,
    message: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'ZenQuestError';
  }
}

// ===== ANALYTICS =====
export interface AnalyticsEvent {
  eventName: string;
  timestamp: Date;
  userId: string;
  properties?: Record<string, unknown>;
}

export interface AnalyticsMetrics {
  dailyActiveUsers: number;
  questCompletionRate: number;
  averageStreakLength: number;
  userRetention: {
    d7: number;
    d30: number;
  };
}

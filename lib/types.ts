export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  remindersEnabled: boolean;
}

export interface Gratitude {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  isPublic: boolean;
  tags: string[];
  vault: 'public' | 'private' | string;
  linkedEntities: string[];
  mediaUrls: string[];
}

export interface User {
  id: string;
  email: string;
  publicUrl: string;
  settings: UserSettings;
  gratitudes: Gratitude[];
}

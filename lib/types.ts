export interface UserSettings {
  theme: "light" | "dark" | "system";
  soundEnabled: boolean;
  remindersEnabled: boolean;
}

export interface Gratitude {
  id: string;
  title: string;
  content: string;
  createdTimestamp: number;
  privacyLevel: "private" | "friends-only" | "public";
  tags: string[];
  vault?: "public" | "private" | string;
  encrypted?: boolean;
  linkedEntities: string[];
  mediaUrls: string[];
  category: string;
  author: string;
  location?: string;
  mood?: string;
  attachments?: string[];
  editedTimestamp?: number;
  sharedWith?: string[];
  lastReminded?: number;
  archived?: boolean;
}

export interface User {
  id: string;
  email: string;
  publicUrl: string;
  settings: UserSettings;
  gratitudes: Gratitude[];
}

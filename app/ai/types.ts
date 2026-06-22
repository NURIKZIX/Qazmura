export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: any; // Firebase Timestamp
  updatedAt: any;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: any;
}

export interface UserProgress {
  userId: string;
  totalXP: number;
  achievements: string[];
}
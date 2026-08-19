export type Role = 'GUEST' | 'READER' | 'AUTHOR' | 'EDITOR' | 'MODERATOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[]; // Array since roles are not mutually exclusive
  avatarUrl?: string;
  isDonor?: boolean;
}

export type ArticleStatus = 'DRAFT' | 'IN_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: string[];
  readTime: number; // minutes
  coverImage?: string;
}

export type CommentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REPORTED';

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  content: string;
  status: CommentStatus;
  createdAt: string;
}

export interface Donation {
  id: string;
  userId: string;
  amount: number;
  frequency: 'ONETIME' | 'MONTHLY';
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  date: string;
  purpose: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface DatabaseState {
  users: User[];
  articles: Article[];
  comments: Comment[];
  donations: Donation[];
  notifications: Notification[];
  bookmarks: { userId: string; articleId: string }[];
  readingHistory: { userId: string; articleId: string; lastReadAt: string; progress: number }[];
}

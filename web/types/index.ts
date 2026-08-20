export type Role = 'GUEST' | 'READER' | 'AUTHOR' | 'EDITOR' | 'MODERATOR' | 'ADMIN';

export interface User {
  id: string;
  name: string; // Used as display name/full name fallback
  email: string;
  password?: string; // For mock auth prototyping
  roles: Role[]; // Array since roles are not mutually exclusive
  avatarUrl?: string;
  isDonor?: boolean;
  createdAt?: string;
  
  // Profile Extensions
  firstName?: string;
  lastName?: string;
  displayName?: string;
  
  // Personal Info
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  
  // About
  bio?: string;
  
  // Preferences
  notificationPreferences?: {
    email?: boolean;
    push?: boolean;
  };
  newsletterPreferences?: {
    weekly?: boolean;
    updates?: boolean;
  };
  contentInterests?: string[];
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
  frequency: 'ONETIME' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';
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

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
  subscribedAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  timestamp: string;
  description: string;
}

export interface MediaItem {
  id: string;
  url: string;
  altText: string;
  uploadedAt: string;
  uploaderId: string;
}

export interface TaxonomyItem {
  id: string;
  name: string;
  type: 'category' | 'tag';
}

export interface DatabaseState {
  users: User[];
  articles: Article[];
  comments: Comment[];
  donations: Donation[];
  notifications: Notification[];
  bookmarks: { userId: string; articleId: string }[];
  readingHistory: { userId: string; articleId: string; lastReadAt: string; progress: number }[];
  subscribers: NewsletterSubscriber[];
  auditLogs: AuditLog[];
  media: MediaItem[];
  taxonomy: TaxonomyItem[];
}

import { DatabaseState } from '../types';

export const initialDbState: DatabaseState = {
  users: [
    {
      id: 'user_admin',
      name: 'Admin User',
      email: 'admin@greatgod.com',
      password: 'password123',
      roles: ['ADMIN', 'READER'],
    },
    {
      id: 'user_editor',
      name: 'Thomas Kent',
      email: 'editor@greatgod.com',
      password: 'password123',
      roles: ['EDITOR', 'AUTHOR', 'READER'],
    },
    {
      id: 'user_author',
      name: 'Grace Adeyemi',
      email: 'grace@greatgod.com',
      password: 'password123',
      roles: ['AUTHOR', 'READER'],
      isDonor: true,
    },
    {
      id: 'user_moderator',
      name: 'Sarah Jenkins',
      email: 'mod@greatgod.com',
      password: 'password123',
      roles: ['MODERATOR', 'READER'],
    },
    {
      id: 'user_reader',
      name: 'Faith Reader',
      email: 'reader@example.com',
      password: 'password123',
      roles: ['READER'],
    },
  ],
  articles: [
    {
      id: 'art_1',
      title: 'The Beauty of Grace in Everyday Trials',
      excerpt: 'Finding the sacred in the mundane is not an exercise in optimism...',
      content: '<p>Grace is found in the quietest corners of our routine.</p>',
      authorId: 'user_author',
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      tags: ['Theology', 'Grace'],
      readTime: 6,
    },
    {
      id: 'art_2',
      title: 'Understanding the Early Church Fathers',
      excerpt: 'Their writings provide a foundational lens through which to view modern doctrinal disputes.',
      content: '<p>Early church fathers...</p>',
      authorId: 'user_editor',
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      tags: ['History', 'Theology'],
      readTime: 12,
    },
    {
      id: 'art_3',
      title: 'Cultivating a Garden of the Mind',
      excerpt: 'How the discipline of what we consume mentally shapes our spiritual vitality.',
      content: '<p>Discipline of the mind...</p>',
      authorId: 'user_moderator',
      status: 'IN_REVIEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['Christian Living'],
      readTime: 5,
    }
  ],
  comments: [],
  donations: [
    {
      id: 'don_1',
      userId: 'user_author',
      amount: 100,
      frequency: 'MONTHLY',
      status: 'ACTIVE',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      purpose: 'General Fund',
    },
    {
      id: 'don_2',
      userId: 'user_author',
      amount: 50,
      frequency: 'ONETIME',
      status: 'COMPLETED',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      purpose: 'Missions',
    },
    {
      id: 'don_3',
      userId: 'user_author',
      amount: 200,
      frequency: 'ONETIME',
      status: 'COMPLETED',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      purpose: 'Building Fund',
    }
  ],
  notifications: [
    {
      id: 'notif_1',
      userId: 'user_admin',
      type: 'devotional',
      message: 'New Devotional: The Sovereignty of Hope. In times of uncertainty, looking back at historical foundations provides a steady anchor. Today\'s reading explores the enduring nature of hope.',
      read: false,
      createdAt: new Date().toISOString(),
      link: '/devotional/the-sovereignty-of-hope'
    },
    {
      id: 'notif_2',
      userId: 'user_admin',
      type: 'reading_plan',
      message: 'Reading Plan Reminder: 30 Days of Psalms. You are on Day 14. Continue your journey through the Psalms today with a focus on gratitude and reverence.',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      link: '/reader/plans'
    },
    {
      id: 'notif_3',
      userId: 'user_admin',
      type: 'security',
      message: 'Account Security: New Login Detected. A new login was detected from a Safari browser in New York, NY. If this was you, no action is needed.',
      read: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      link: '/account/security'
    },
    {
      id: 'notif_4',
      userId: 'user_admin',
      type: 'donation',
      message: 'Stewardship: Monthly Contribution Received. Thank you for your faithful support. Your receipt for this month\'s contribution is now available in your history.',
      read: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      link: '/history'
    },
    {
      id: 'notif_5',
      userId: 'user_author',
      type: 'system',
      message: 'Article Approved: The Beauty of Grace in Everyday Trials has been published.',
      read: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      link: '/article/the-beauty-of-grace'
    }
  ],
  bookmarks: [],
  readingHistory: [],
  subscribers: [],
  auditLogs: [
    {
      id: 'audit_1',
      actorId: 'user_admin',
      action: 'ARTICLE_PUBLISHED',
      targetType: 'ARTICLE',
      targetId: 'art_1',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Published article "The Beauty of Grace in Everyday Trials"'
    },
    {
      id: 'audit_2',
      actorId: 'user_editor',
      action: 'ARTICLE_APPROVED',
      targetType: 'ARTICLE',
      targetId: 'art_2',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Approved manuscript "Understanding the Early Church Fathers"'
    },
    {
      id: 'audit_3',
      actorId: 'user_admin',
      action: 'ROLE_UPDATED',
      targetType: 'USER',
      targetId: 'user_author',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Updated roles for Grace Adeyemi to [AUTHOR, READER]'
    }
  ],
  media: [
    {
      id: 'media_1',
      url: 'https://images.unsplash.com/photo-1544640808-32cb4f5f5bce?auto=format&fit=crop&q=80',
      altText: 'Antique Bible open on a wooden desk',
      uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      uploaderId: 'user_admin'
    },
    {
      id: 'media_2',
      url: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80',
      altText: 'Stained glass window in cathedral',
      uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      uploaderId: 'user_editor'
    }
  ],
  taxonomy: [
    { id: 'tax_1', name: 'Theology', type: 'category' },
    { id: 'tax_2', name: 'Christian Living', type: 'category' },
    { id: 'tax_3', name: 'History', type: 'category' },
    { id: 'tax_4', name: 'Grace', type: 'tag' },
    { id: 'tax_5', name: 'Prayer', type: 'tag' }
  ]
};

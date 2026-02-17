
import React from 'react';
import { Quest, Badge } from './types';

export const INITIAL_STATS = {
  level: 3,
  xp: 245,
  xpMax: 600,
  coins: 120,
  diamonds: 15,
  streak: 7,
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'v1',
    title: 'The Morning Chapter',
    intention: 'Write three sentences about your intention for today.',
    duration: '3m',
    xpReward: 60,
    coinReward: 20,
    isCompleted: false,
    category: 'mental'
  },
  {
    id: 'v2',
    title: 'Physical Narrative',
    intention: 'Walk for 10 minutes and observe one story around you.',
    duration: '10m',
    xpReward: 100,
    coinReward: 30,
    isCompleted: false,
    category: 'physical'
  },
  {
    id: 'v3',
    title: 'Evening Reflection',
    intention: 'Summarize your day as a story with a happy ending.',
    duration: '5m',
    xpReward: 80,
    coinReward: 25,
    isCompleted: false,
    category: 'spiritual'
  },
  // NEW VERBLIS-LINKED QUESTS
  {
    id: 'verblis_1',
    title: 'Watch Morning Flow',
    intention: 'Start your day with Petrena\'s uplifting yoga flow on YouTube.',
    duration: '15m',
    xpReward: 100,
    coinReward: 20,
    isCompleted: false,
    category: 'physical',
    link: 'https://www.youtube.com/watch?v=kY0R3r170kM' // Placeholder for a real video
  },
  {
    id: 'verblis_2',
    title: 'Stress Relief Meditation',
    intention: 'Reduce anxiety with Petrena\'s guided meditation session.',
    duration: '10m',
    xpReward: 75,
    coinReward: 15,
    isCompleted: false,
    category: 'mental',
    link: 'https://www.youtube.com/watch?v=VIDEO_ID_FOR_STRESS_RELIEF' // Placeholder for a real video
  },
  {
    id: 'verblis_3',
    title: 'Follow Verblis Community',
    intention: 'Join the vibrant Verblis wellness community on Instagram.',
    duration: '2m',
    xpReward: 50,
    coinReward: 10,
    isCompleted: false,
    category: 'social',
    link: 'https://instagram.com/verblis'
  },
  {
    id: 'verblis_4',
    title: 'Connect with Coach Petrena',
    intention: 'Reach out to Petrena for personalized wellness guidance.',
    duration: '0m',
    xpReward: 200,
    coinReward: 50,
    isCompleted: false,
    category: 'emotional',
    link: 'mailto:petrenawood@verblis.com'
  },
];

export const INITIAL_BADGES: Badge[] = [
  { id: '1', name: 'Inkwell Novice', icon: '🖋️', isUnlocked: true, color: '#0F172A' },
  { id: '2', name: 'Story Weaver', icon: '📜', isUnlocked: true, color: '#D4AF37' },
  { id: '3', name: 'Narrative Flow', icon: '🌊', isUnlocked: false, color: '#999999' },
  { id: '4', name: 'Golden Pen', icon: '🖋️', isUnlocked: false, color: '#999999' },
  { id: '5', name: 'Zen Author', icon: '📖', isUnlocked: false, color: '#999999' },
  { id: '6', name: 'Lyrical Soul', icon: '🎵', isUnlocked: false, color: '#999999' },
  { id: '7', name: 'Daily Chapter', icon: '📅', isUnlocked: false, color: '#999999' },
  { id: '8', name: 'Master Scribe', icon: '👑', isUnlocked: false, color: '#999999' },
];

export const VERBLIS_SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://instagram.com/verblis', handle: '@verblis', icon: '📸', color: '#E4405F' },
  { platform: 'TikTok', url: 'https://tiktok.com/@petrena.wood', handle: '@petrena.wood', icon: '🎵', color: '#000000' },
  { platform: 'YouTube', url: 'https://youtube.com/@verblis', handle: 'Verblis Yoga & Wellness', icon: '🎬', color: '#FF0000' },
  { platform: 'Facebook', url: 'https://facebook.com/verblis', handle: 'Verblis Yoga & Wellness', icon: '👍', color: '#1877F2' },
];

export const VERBLIS_FEATURED_VIDEOS = [
  {
    title: 'Beating Burnout: Stress Relief',
    duration: '12 min',
    youtubeId: 'VIDEO_ID_1', // Replace with actual YouTube ID
    views: '1.2K', // Static for now
  },
  {
    title: 'Morning Yoga Flow for Energy',
    duration: '15 min',
    youtubeId: 'kY0R3r170kM', // Placeholder: Found a generic flow, replace with Petrena's
    views: '2.1K',
  },
  {
    title: 'Meditation for Positive Energy',
    duration: '10 min',
    youtubeId: 'VIDEO_ID_3', // Replace with actual YouTube ID
    views: '1.8K',
  },
];

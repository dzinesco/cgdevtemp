/**
 * Global configuration for the CrispyGoat template
 * This file will be customized during project setup
 */

export const config = {
  project: {
    name: 'CrispyGoat Template',
    description: 'A modern web application built with CrispyGoat template',
    author: 'CrispyGoat Team',
    version: '1.0.0'
  },
  techStack: {
    framework: 'astro',
    database: 'postgresql',
    cms: 'strapi'
  },
  theme: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F8FAFC',
    text: '#1F2937'
  },
  features: [
    'auth',
    'docs',
    'contact',
    'blog',
    'seo'
  ],
  deployment: {
    hosting: 'vercel',
    dbHosting: 'supabase'
  }
};

export type Config = typeof config;
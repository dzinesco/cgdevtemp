import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import auth from '@auth/astro';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    auth({
      providers: [],
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
      },
    })
  ],
  output: 'server',
  adapter: await import('@astrojs/vercel/serverless').then(mod => mod.default()),
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  },
});
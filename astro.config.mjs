// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/My_Website/',
  integrations: [react()]
});
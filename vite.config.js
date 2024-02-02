/// <reference types="vitest" />
import path from 'node:path';

import { defineConfig } from 'vite';
import fg from 'fast-glob';

export default defineConfig({
  build: {
    rollupOptions: {
      input: fg.sync('./*.html', {absolute: true})
    }
  },
});

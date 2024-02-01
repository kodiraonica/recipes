/// <reference types="vitest" />
import path from 'node:path';

import { defineConfig } from 'vite';
import { partytownVite } from '@builder.io/partytown/utils';

export default defineConfig({
  build: {
  },
  plugins: [
    partytownVite({
      dest: path.join(__dirname, 'dist')
    })
  ],
  test: {},
});

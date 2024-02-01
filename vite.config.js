/// <reference types="vitest" />
import path from 'node:path';

import { defineConfig } from 'vite';
import { partytownVite } from '@builder.io/partytown/utils';

export default defineConfig({
  plugins: [
    partytownVite({
      entry: path.join(__dirname, 'src/index.html'),
      dest: path.join(__dirname, 'dist')
    })
  ],
});

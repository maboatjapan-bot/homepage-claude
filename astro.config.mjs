import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://www.swiftechie.com',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  image: {
    // 图片优化配置
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // 远程图片允许列表（如需要）
    remotePatterns: [],
  },
  vite: {},
});

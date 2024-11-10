import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // 添加 baseUrl 配置
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
    watchForFileChanges: false,  // 禁用文件变化时自动重新执行测试
  },
});

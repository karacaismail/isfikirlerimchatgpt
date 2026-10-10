import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  snapshotPathTemplate:
    '{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}-{platform}{ext}',
  timeout: 30000,
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL:
      process.env.SITE_URL || 'http://127.0.0.1:4179/isfikirlerimchatgpt/',
    locale: 'tr-TR',
    timezoneId: 'Europe/Istanbul',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  webServer: process.env.SITE_URL
    ? undefined
    : {
        command: 'npm run preview',
        url: 'http://127.0.0.1:4179/isfikirlerimchatgpt/teknik/',
        reuseExistingServer: true,
      },
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/browser-results.json' }],
  ],
});

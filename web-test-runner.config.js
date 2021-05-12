import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'src/**/*.test.js',
  nodeResolve: true,
  browserLogs: false,

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Confgure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,
  coverageConfig: {
    report: true,
    reporters: ['cobertura'],
  },

  /** Browsers to run tests on */
    browsers: [
      puppeteerLauncher({
        launchOptions: {
          args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--use-fake-device-for-media-stream'],
        },
      }),
    ],

  // See documentation for all available options
});

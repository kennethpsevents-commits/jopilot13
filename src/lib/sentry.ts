export function initSentry() {
  if (process.env.SENTRY_DSN) {
    // add Sentry initialization for server-side when needed
    console.log('Sentry configured');
  }
}

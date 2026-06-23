import { createClient } from '@blinkdotnew/sdk';

// Project id can be overridden at build time via VITE_BLINK_PROJECT_ID,
// otherwise it falls back to the project that scaffolded this site.
const projectId = import.meta.env.VITE_BLINK_PROJECT_ID ?? 'neubrutali-portfolio-dfgzpow5';

export const blink = createClient({
  projectId,
  authRequired: false,
  auth: { mode: 'managed' },
});

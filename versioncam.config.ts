import { defineRecorder } from 'versioncam';

export default defineRecorder({
  // Next's default port: the dev script is a bare `next dev`.
  baseUrl: 'http://localhost:3000',
  // CONTRIBUTING's "Run the project" step.
  webServer: { command: 'npm run dev', url: 'http://localhost:3000' },
  viewport: { width: 1440, height: 900 },
  clips: 'demos/clips/**/*.clip.ts',
  // The clip edits two fields and switches the template, which takes longer
  // than the default 9 to 11 seconds to show readably.
  review: { minSeconds: 15, maxSeconds: 20 },
});

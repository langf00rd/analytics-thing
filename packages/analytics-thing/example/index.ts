import { AnalyticsThing, track } from '../dist/index';

const analytics = new AnalyticsThing({ token: 'SOME-TOKEN-HERE' });

(async () => {
  const trackResponse = await track({
    client: analytics,
    event: 'page view',
    description: 'some description of event',
    channel: 'channel123',
    metadata: { duration: 20, something: 'another thing' },
  });
  console.log({ trackResponse });
})();

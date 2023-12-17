import { AnalyticsThing } from '../dist/index';

const analytics = new AnalyticsThing({ token: 'SOME-TOKEN-HERE' });

(async () => {
  const trackResponse = await analytics.track({
    event: 'user signed in',
    project: 'project 69',
    description: 'this is a description',
    channel: 'another channel',
    metadata: {
      view_duration: '300ms',
      something: 'anotherthing',
    },
  });

  console.time();
  console.log({ trackResponse });
  console.timeEnd();

  // const channelEventsResponse =
  //   await analytics.getChannelEvents('demo-channel');

  // console.time();
  // console.log({ channelEventsResponse });
  // console.timeEnd();

  // const projectEventsResponse = await analytics.getProjectEvents('project-69');

  // console.time();
  // console.log({ projectEventsResponse });
  // console.timeEnd();
})();

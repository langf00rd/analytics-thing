export interface TrackProps {
  event: string;
  project: string;
  description: string;
  channel: string;
  metadata: {
    [key: string]: boolean | string | number;
  };
}

export interface AnalyticsThingProps {
  token: string;
}

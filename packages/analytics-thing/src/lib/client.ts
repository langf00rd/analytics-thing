import { API_BASE_URL } from './constants';
import { AnalyticsThingProps, TrackProps } from './interface';

/** the analytics thing client */
export class AnalyticsThing {
  /** your analytics thing token */
  token: string;

  constructor({ token }: AnalyticsThingProps) {
    this.token = token;
  }

  /** ingest a tracking event payload */
  async track(payload: TrackProps) {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      throw { error };
    }
  }

  /** fetches all events for a particular channel */
  async getChannelEvents(channel: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/events/channels/${channel}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
        }
      );
      return await response.json();
    } catch (error) {
      throw { error };
    }
  }

  /** fetches all events for a particular project */
  async getProjectEvents(project: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/events/projects/${project}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.token,
          },
        }
      );
      return await response.json();
    } catch (error) {
      throw { error };
    }
  }
}

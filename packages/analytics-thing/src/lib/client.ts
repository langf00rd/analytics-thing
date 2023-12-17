interface AnalyticsThingProps {
  token: string;
}

/** the analytics thing class */
export class AnalyticsThing {
  token: string;

  constructor({ token }: AnalyticsThingProps) {
    this.token = token;
  }
}

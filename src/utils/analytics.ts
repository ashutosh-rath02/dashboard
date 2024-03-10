import { redis } from "@/lib/redis";
import { getDate } from "@/utils";
import { parse } from "date-fns";
type AnalyticsArgs = {
  retention?: number;
};
type TrackOptions = {
  persist?: boolean;
};
export class Analytics {
  private retentions: number = 60 * 60 * 24 * 7;

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) {
      this.retentions = opts.retention;
    }
  }
  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    let key = `analytics::${namespace}`;

    if (!opts?.persist) {
      key += `::${getDate()}`;
    }
    //db call to persistent this event
    await redis.hincrby(key, JSON.stringify(event), 1);
    if (!opts?.persist) {
      await redis.expire(key, this.retentions);
    }
  }

  //retrieve
  async retrieve(namespace: string, date: string) {
    const res = await redis.hgetall<Record<string, string>>(
      `analytics::${namespace}::${date}`
    );

    return {
      date,
      events: Object.entries(res ?? []).map(([key, value]) => ({
        [key]: Number(value),
      })),
    };
  }

  //retreive days
  async retrieveDays(namespace: string, nDays: number) {
    type AnalyticsPromise = ReturnType<typeof analytics.retrieve>;
    const promises: AnalyticsPromise[] = [];
    for (let i = 0; i < nDays; i++) {
      const formattedDate = getDate(i);
      const promise = analytics.retrieve(namespace, formattedDate);
      promises.push(promise);
    }

    const fetched = await Promise.all(promises);

    const data = fetched.sort((a, b) => {
      if (
        parse(a.date, "dd/MM/yyyy", new Date()) >
        parse(b.date, "dd/MM/yyyy", new Date())
      ) {
        return 1;
      } else {
        return -1;
      }
    });
    return data;
  }
}

export const analytics = new Analytics();

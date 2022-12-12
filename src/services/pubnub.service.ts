import PubNub from "pubnub";

import { Logger } from "@utils/logger";

const URL_CHANNEL_NAME = "url_channel";

class PubNubService {
  private pubnub: PubNub;

  constructor() {
    this.init();
  }

  private init() {
    try {
      this.pubnub = new PubNub({
        publishKey: process.env.PUB_NUB_PUBLISH_KEY,
        subscribeKey: process.env.PUB_NUB_SUBSCRIBE_KEY || "",
        secretKey: process.env.PUB_NUB_SECRET_KEY,
        userId: "backend",
      });
    } catch (error) {
      Logger.info(error);
    }
  }

  public async sendShortenedURL(shortenedURL: string) {
    await this.pubnub.publish(
      {
        message: {
          shortenedURL,
        },
        channel: URL_CHANNEL_NAME,
      },
      (status, response) => {}
    );
  }
}

export default new PubNubService();

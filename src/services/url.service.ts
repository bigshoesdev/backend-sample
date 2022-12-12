import config from "@config";

class URLService {
  private urlIDMap: { [index: string]: string } = {};

  private makeUniqueID(length: number) {
    let result = "";

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  private getIDFromURL(url: string): string | undefined {
    for (let id in this.urlIDMap) {
      if (this.urlIDMap[id] === url) {
        return id;
      }
    }
  }

  private getSharedURLWithID(id: string) {
    return `http://${config.host}:${config.port}/${id}`;
  }

  public getURLFromID(id: string) {
    return this.urlIDMap[id];
  }

  public isIDExist(id: string): boolean {
    return id in this.urlIDMap;
  }

  public generateShortenedURL(url: string): string {
    let id = this.getIDFromURL(url);

    if (id) {
      return this.getSharedURLWithID(id);
    }

    while (true) {
      id = this.makeUniqueID(10);
      if (!this.isIDExist(id)) {
        break;
      }
    }

    this.urlIDMap[id] = url;

    return this.getSharedURLWithID(id);
  }
}

export default new URLService();

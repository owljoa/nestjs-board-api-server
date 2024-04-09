// TODO: 그냥 함수로만 불가능한가..
export class CommonUtil {
  static isNullOrBlank(string?: string): boolean {
    return string == undefined || CommonUtil.isBlank(string);
  }

  static isBlank(string: string): boolean {
    return string.trim().length == 0;
  }

  static getLimitFromSize(defaultPageSize: number, size?: number): number {
    if (size == undefined || size <= 0) {
      return defaultPageSize;
    }
    return size;
  }

  static getOffsetFromPage(defaultPage: number, limit: number, page?: number): number {
    let correctedPage = page;
    if (page == undefined || page <= 0) {
      correctedPage = defaultPage;
    }
    return limit * (correctedPage - 1);
  }
}

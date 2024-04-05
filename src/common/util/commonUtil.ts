// TODO: 그냥 함수로만 불가능한가..
export class CommonUtil {
  static isNullOrBlank(string?: string): boolean {
    return string == undefined || CommonUtil.isBlank(string);
  }

  static isBlank(string: string): boolean {
    return string.trim().length == 0;
  }
}

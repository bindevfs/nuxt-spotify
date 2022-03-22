export class StringUtil {
  static getIdFromUri(uri) {
    const ids = uri.split(':')
    return ids[ids.length - 1]
  }
}

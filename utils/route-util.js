import { RouterUtil } from './router-util'

export class RouteUtil {
  static getArtistRouteUrl (artistId) {
    return `${RouterUtil.Configuration.Artist}/${artistId}`
  }

  static getAlbumRouteUrl(albumId) {
    return `/${RouterUtil.Configuration.Albums}/${albumId}`;
  }
}

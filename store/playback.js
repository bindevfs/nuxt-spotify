import { RouteUtil } from '~/utils/route-util'
import { StringUtil } from '~/utils/string-util'

export const state = () => ({
  deviceId: '',
  playbackData: {},
  volume: 0
})

export const getters = {
  currentTrack (state) {
    const { track_window: trackWindow } = state.playbackData
    const track = trackWindow?.current_track || ''
    if (!track) {
      return null
    }
    const { album } = track
    const albumId = StringUtil.getIdFromUri(album.uri)
    const albumUrl = RouteUtil.getAlbumRouteUrl(albumId)
    const trackExtended = {
      ...track,
      albumUrl,
      artists: track.artists.map((artist) => {
        const artistId = StringUtil.getIdFromUri(artist.uri)
        const artistUrl = RouteUtil.getArtistRouteUrl(artistId)
        return {
          ...artist,
          artistUrl
        }
      })
    }
    console.log('trackExtended: ', trackExtended)
    return trackExtended
  },
  position (state) {
    return state.playbackData?.position || 0
  },
  volume (state) {
    return state.playbackData.volume || 100
  }
}

export const mutations = {
  setDeviceId (state, payload) {
    state.deviceId = payload
  },
  setPlaybackData (state, payload) {
    state.playbackData = payload.data
    state.volume = payload.volume
  }
}

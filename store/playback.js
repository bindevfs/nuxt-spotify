import { RouteUtil } from '~/utils/route-util'
import { StringUtil } from '~/utils/string-util'

export const state = () => ({
  deviceId: '',
  playbackData: {},
  playbackContext: {},
  playback: {},
  volume: 0
})

export const getters = {
  getPlayback(state) {
    return state.playback
  },
  isPlaying: (state) => state.playback?.is_playing,
  getPlaybackContext: (state) => state.playbackContext,
  currentTrack(state) {
    const { track_window: trackWindow } = state.playbackData
    const track = trackWindow?.current_track || ''
    if (!track) {
      return null
    }
    const { album } = track
    const albumId = StringUtil.getIdFromUri(album.uri)
    const albumUrl = RouteUtil.getAlbumRouteUrl(albumId)
    return {
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
  },
  position(state) {
    return state.playbackData?.position || 0
  },
  volume(state) {
    return state.playbackData.volume || 100
  }
}

export const mutations = {
  setDeviceId(state, payload) {
    state.deviceId = payload
  },
  setPlaybackData(state, payload) {
    state.playbackData = payload.data
    state.volume = payload.volume
  },
  SET_PLAYBACK(state, playback) {
    state.playback = playback
  },
  SET_PLAYBACK_CONTEXT(state, playback) {
    state.playbackContext = playback
  }
}

export const actions = {
  waitForSpotifyWebPlaybackSDKToLoad() {
    window.onSpotifyWebPlaybackSDKReady = () => {
    }

    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve(window.Spotify)
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify)
        }
      }
    })
  },
  async initPlayer({ dispatch, rootState, commit }, token) {
    if (rootState.auth.isLoggedIn) {
      window.onSpotifyWebPlaybackSDKReady = () => {
      }
      return
    }
    const { Player } = await dispatch('waitForSpotifyWebPlaybackSDKToLoad')
    const player = new Player({
      name: 'Nuxt Spotify',
      volume: 1,
      getOAuthToken: (callback) => {
        callback(token)
      }
    })

    player.addListener('ready', ({ device_id: deviceId }) => {
      console.info('This device goes active. 🚀', deviceId)
      commit('setDeviceId', deviceId)
      dispatch('transferUserPlayback', deviceId)
    })

    player.addListener('not_ready', ({ device_id: deviceId }) => {
      console.info('This device has gone offline. 😴', deviceId)
    })

    player.addListener('initialization_error', (err) => {
      console.error({ err })
    })

    player.addListener('authentication_error', (err) => {
      console.error({ err })
      // await dispatch('auth/refreshAccessToken', undefined, { root: true });
      // await dispatch('player/disconnectPlayer', undefined, { root: true });
      // await dispatch('player/initPlayer', undefined, { root: true });
    })

    player.addListener('account_error', (err) => {
      console.error({ err })
    })
    player.addListener('playback_error', (err) => {
      console.error({ err })
    })

    player.addListener('player_state_changed', (async (playerState) => {
      if (!playerState) {
        console.log('No player info!.')
        return
      }
      commit('setPlaybackData', { data: playerState, volume: await player.getVolume() })
      dispatch('setPlaybackContext', playerState)
      dispatch('setPlayBack')
    }))

    await player.connect()
  },
  setPlaybackContext({ commit }, context) {
    commit('SET_PLAYBACK_CONTEXT', context);
  },
  async setPlayBack({ commit }) {
    try {
      const res = await this.$playerApi.getCurrentPlayBack()
      commit('SET_PLAYBACK', res)
    } catch (e) {
      console.log('[setPlayBack]: ', e)
    }
  },
  async transferUserPlayback({ commit }, deviceId) {
    try {
      await this.$playerApi.transferUserPlayback(deviceId)
    } catch (e) {
      console.error(e)
    }
  },
  async togglePlay({ commit }, { isPlaying, request }) {
    try {
      if (isPlaying) {
        await this.$playerApi.pause()
      } else {
        await this.$playerApi.play(request)
      }
    } catch (e) {
      console.error(e)
    }
  },
  async next() {
    try {
      await this.$playerApi.next()
    } catch (e) {
      console.error(e)
    }
  },
  async prev() {
    try {
      await this.$playerApi.prev()
    } catch (e) {
      console.error(e)
    }
  },
  async seek(context, positionMs) {
    try {
      await this.$playerApi.seek(positionMs)
    } catch (e) {
      console.error(e)
    }
  }
}

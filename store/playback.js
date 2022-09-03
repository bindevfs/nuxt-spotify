import { RouteUtil } from '~/utils/route-util'
import { StringUtil } from '~/utils/string-util'

export const state = () => ({
  deviceId: '',
  playback: {},
  volume: 0
})

export const getters = {
  getPlayback(state) {
    return state.playback
  },
  isPlaying: (state) => {
    return !state.playback?.paused
  },
  currentTrack(state) {
    const { track_window: trackWindow } = state.playback
    const track = trackWindow?.current_track
    if (!track) {
      return null
    }
    const { album } = track
    const albumId = StringUtil.getIdFromUri(album?.uri || '')
    const albumUrl = RouteUtil.getAlbumRouteUrl(albumId)
    return {
      ...track,
      albumUrl,
      artists: track?.artists?.map((artist) => {
        const artistId = StringUtil.getIdFromUri(artist.uri || '')
        const artistUrl = RouteUtil.getArtistRouteUrl(artistId)
        return {
          ...artist,
          artistUrl
        }
      })
    }
  },
  position(state) {
    return state.playback?.position || 0
  },
  volume(state) {
    return state.volume || 1
  }
}

export const mutations = {
  setDeviceId(state, payload) {
    state.deviceId = payload
  },
  SET_PLAYBACK(state, payload) {
    state.playback = payload?.data || {}
    state.volume = payload.volume
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
  setAppTitle({ dispatch, rootState, commit, getters }, track) {
    const currentTrack = track.track_window?.current_track;
    if (currentTrack) {
      const artistName = currentTrack.artists[0].name || '';
      document.title = `Nuxt Spotify - ${currentTrack.name} ${artistName ? `- ${artistName}` : ''}`
    }
  },
  async initPlayer({ dispatch, rootState, commit, getters }, token) {
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

    player.addListener('player_state_changed', async (playerState) => {
      if (!playerState) {
        console.info('[Nuxt Spotify] No player info!');
        return
      }
      dispatch('setAppTitle', playerState)
      commit('SET_PLAYBACK', { data: playerState, volume: await player.getVolume() })
    })

    await player.connect()
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

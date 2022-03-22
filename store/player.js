// import { shuffle } from 'lodash-es'

export const state = () => ({
  recentlyPlayedList: []
})

export const mutations = {
  setRecentlyPlayedList(state, payload) {
    state.recentlyPlayedList = payload
  }
}

export const actions = {
  async initPlayer({ dispatch, rootState, commit }, token) {
    if (rootState.auth.isLoggedIn) {
      window.onSpotifyWebPlaybackSDKReady = () => {
      }
      return
    }
    const { Player } = await dispatch('waitForSpotifyWebPlaybackSDKToLoad')
    const player = new Player({
      name: 'spotify',
      volume: 1,
      getOAuthToken: (callback) => {
        callback(token)
      }
    })

    player.addListener('ready', ({ device_id: deviceId }) => {
      console.info('This device goes active. 🚀', deviceId)
      commit('playback/setDeviceId', deviceId, { root: true })
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
      console.log('playerState: ', playerState)
      if (!playerState) {
        console.log('No player info!.')
        return
      }
      commit('playback/setPlaybackData', { data: playerState, volume: await player.getVolume() }, { root: true })
    }))

    await player.connect()
  },
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
  async getRecentlyPlayedAction({ commit }) {
    try {
      const { items } = await this.$playerApi.getRecentlyPlayed()
      commit('setRecentlyPlayedList', items)
    } catch (e) {
      console.error(e)
    }
  },
  async transferUserPlayback({ commit }, deviceId) {
    try {
      const a = await this.$playerApi.transferUserPlayback(deviceId)
      console.log('a', a)
    } catch (e) {
      console.error(e)
    }
  }
}

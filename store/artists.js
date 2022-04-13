import { isMediaPlayingState } from '~/utils/state-util'

export const state = () => ({
  topTracks: [],
  artist: {},
  artistRelated: []
})

export const getters = {
  getTopFiveArtistRelated (state) {
    return state.artistRelated.slice(0, 5)
  },
  combinePlayBackUri (state, getters, rootState, rootGetters) {
    const playBackContext = rootGetters['playback/getPlaybackContext']
    const uriTracks = state.topTracks.map((track) => track.uri)
    return uriTracks.map((uri) => {
      return [
        uri,
        playBackContext
      ]
    })
  },
  isArtistPlaying (state, getters) {
    return isMediaPlayingState(getters.combinePlayBackUri)
  }
}

export const mutations = {
  setTopTracks (state, payload) {
    state.topTracks = payload
  },
  setArtist (state, payload) {
    state.artist = payload
  },
  setArtistRelated (state, payload) {
    state.artistRelated = payload
  }
}

export const actions = {
  async getArtistTopTrackAction ({commit}, id) {
    try {
      const { tracks } = await this.$artistsApi.getArtistTopTrack(id)
      commit('setTopTracks', tracks)
    } catch (e) {
      console.error(e)
    }
  },
  async getArtistAction ({commit}, id) {
    try {
      const artist = await this.$artistsApi.getArtist(id)
      commit('setArtist', artist)
    } catch (e) {
      console.error(e)
    }
  },
  async getArtistRelatedAction ({commit}, id) {
    try {
      const { artists } = await this.$artistsApi.getArtistRelated(id)
      console.log(artists)
      commit('setArtistRelated', artists)
    } catch (e) {
      console.error(e)
    }
  }
}

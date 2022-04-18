import { isMediaPlayingState } from '~/utils/state-util'

export const state = () => ({
  album: null
})

export const getters = {
  getTracks (state) {
    return state.album?.tracks?.items || []
  },
  getAlbumSummary (state) {
    if(state.album) {
      const type = state.album?.album_type || ''
      const artists = state.album?.artists || []
      const name = state.album?.name || ''
      const imageUrl = state.album?.images?.length !== 0 ? state.album?.images[0]?.url : ''
      return {
        type,
        artists,
        name,
        imageUrl
      }
    }
    return {}
  },
  combinePlayBackUri (state, getters, rootState, rootGetters) {
    const playBackContext = rootGetters['playback/getPlaybackContext']
    const uriTracks = getters.getTracks.map((track) => track?.uri)
    return uriTracks.map((uri) => {
      return [
        uri,
        playBackContext
      ]
    })
  },
  isAlbumPlaying (state, getters) {
    console.log(getters.combinePlayBackUri)
    return isMediaPlayingState(getters.combinePlayBackUri)
  }
}

export const mutations = {
  SET_ALBUM (state, payload) {
    state.album = payload
  }
}

export const actions = {
  async getAlbum ({commit}, id) {
    try {
      const res = await this.$albumsApi.getAlbum(id)
      console.log('res', res)
      commit('SET_ALBUM', res)
    } catch (e) {
      console.error(e)
    }
  }
}

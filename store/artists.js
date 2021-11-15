export const state = () => ({
  topTracks: [],
  artist: {}
})

export const mutations = {
  setTopTracks (state, payload) {
    state.topTracks = payload
  },
  setArtist (state, payload) {
    state.artist = payload
  }
}

export const actions = {
  async getArtistTopTrackAction ({commit}, id) {
    try {
      const { tracks } = await this.$artistsApi.getArtistTopTrack(id)
      console.log(tracks)
      commit('setTopTracks', tracks)
    } catch (e) {
      console.error(e)
    }
  },
  async getArtistAction ({commit}, id) {
    try {
      const artist = await this.$artistsApi.getArtist(id)
      console.log(artist)
      commit('setArtist', artist)
    } catch (e) {
      console.error(e)
    }
  }
}

export const state = () => ({
  browseCategories: [],
  playlists: []
})

export const mutations = {
  setBrowseCategories (state, payload) {
    state.browseCategories = payload
  },
  setBrowsePlaylists (state, payload) {
    state.playlists = payload
  }
}

export const actions = {
  async getBrowseAllCategoriesAction ({commit}) {
    try {
      const { categories } = await this.$browseApi.getBrowseAllCategories()
      commit('setBrowseCategories', categories.items)
    } catch (e) {
      console.error(e)
    }
  },
  async getCategoryPlaylistsAction ({commit}, id) {
    try {
      const { playlists } = await this.$browseApi.getCategoryPlaylists(id)
      commit('setBrowsePlaylists', playlists.items)
    } catch (e) {
      console.error(e)
    }
  }
}

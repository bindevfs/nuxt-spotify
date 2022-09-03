export const state = () => ({
  browseCategories: [],
  playlists: [],
  featuredPlayLists: {}
})

export const getters = {
  getTitleFeaturedPlayLists (state) {
    return state.featuredPlayLists?.message
  } ,
  getFeaturedPlayLists (state) {
    return state.featuredPlayLists?.playlists?.items || []
  }
}

export const mutations = {
  setBrowseCategories (state, payload) {
    state.browseCategories = payload
  },
  setBrowsePlaylists (state, payload) {
    state.playlists = payload
  },
  SET_FEATURED_PLAYLISTS (state, payload) {
    state.featuredPlayLists = payload
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
  },
  async getFeaturedPlayLists ({ commit }) {
    try {
      const res = await this.$browseApi.getFeaturedPlayLists()
      commit('SET_FEATURED_PLAYLISTS', res)
    } catch (e) {
      console.error(e)
    }
  },
}

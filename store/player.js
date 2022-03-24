export const state = () => ({
  recentlyPlayedList: []
})

export const getters = {
  getRecentlyPlayedList (state) {
    return state.recentlyPlayedList
      .filter(({ track }, idx, arr) => {
        return arr.findIndex((item) => item.track.id === track.id) === idx
      })
      .slice(0, 20);
  }
}

export const mutations = {
  setRecentlyPlayedList(state, payload) {
    state.recentlyPlayedList = payload
  }
}

export const actions = {
  async getRecentlyPlayedAction({ commit }) {
    try {
      const { items } = await this.$playerApi.getRecentlyPlayed()
      commit('setRecentlyPlayedList', items)
    } catch (e) {
      console.error(e)
    }
  }
}

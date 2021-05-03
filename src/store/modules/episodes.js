import axios from 'axios'

const STATE = () => {
  return {
    episodes: {},
    error: '',
    loading: true
  }
}

const state = STATE()

// Getters
const getters = {
  getEpisodes: (state) => state.episodes,
  getErrorMessage: (state) => state.error,
  getLoadingStatus: (state) => state.loading
}

// Mutations
const mutations = {
  addEpisode(state, episode) {
    state.episodes.push(episode)
  },
  setEpisodes(state, episodes) {
    state.episodes = episodes
  },
  setErrorMessage(state, error) {
    state.error = error
  },
  setLoadingStatus(state, loading) {
    state.loading = loading
  }
}

// Actions
const actions = {
  resetStore({ commit }) {
    commit('setEpisodes', [])
    commit('setErrorMessage', '')
    commit('setLoadingStatus', true)
  },
  async loadEpisodes({ dispatch, commit }, characterEpisodes) {
    commit('setLoadingStatus', true)

    for (let i = 0; i < characterEpisodes.length; i++) {
      const url = characterEpisodes[i]

      await dispatch('loadEpisode', url)
    }

    commit('setLoadingStatus', false)
  },
  async loadEpisode({ commit }, url) {
    try {
      const response = await axios.get(url)

      if (response.data) {
        commit('addEpisode', response.data)
      }
    } catch (error) {
      if (error.response.data.error) {
        commit('setErrorMessage', error.response.data.error)
      }

      console.error('Error happened while fetching episode via API', error)
    }
  }
}

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
  state
}

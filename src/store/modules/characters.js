import axios from 'axios'

const STATE = () => {
  return {
    characters: [],
    information: {},
    error: '',
    loading: true
  }
}

const state = STATE()

// Getters
const getters = {
  getCharacters: (state) => state.characters,
  getInformation: (state) => state.information,
  getErrorMessage: (state) => state.error,
  getLoadingStatus: (state) => state.loading
}

// Mutations
const mutations = {
  setCharacters(state, characters) {
    state.characters = characters
  },
  setInformation(state, information) {
    state.information = information
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
  async loadPage({ commit }, data) {
    try {
      commit('setLoadingStatus', true)
      const api = process.env.VUE_APP_API_ROOT

      const response = await axios.get(
        `${api}?page=${data.page}&count=${data.qty}${data.search ? `&name=${data.search}` : ''}`
      )

      if (response.data) {
        const { info, results } = response.data

        commit('setCharacters', results)
        commit('setInformation', { ...info })
        commit('setErrorMessage', '')
      }
    } catch (error) {
      if (error.response.data.error) {
        commit('setCharacters', [])
        commit('setInformation', {})
        commit(
          'setErrorMessage',
          `This is quite the pickle, Morty...<br><span class="pickle">${data.search}</span> doesn't exist in this universe!`
        )
      }

      console.error('Error happened while fetching via API', error)
    } finally {
      commit('setLoadingStatus', false)
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

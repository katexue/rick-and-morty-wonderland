import axios from 'axios'

const STATE = () => {
  return {
    character: {},
    error: '',
    loading: true,
    avatarLoading: {}
  }
}

const state = STATE()

// Getters
const getters = {
  getCharacter: (state) => state.character,
  getErrorMessage: (state) => state.error,
  getLoadingStatus: (state) => state.loading,
  getAvatarLoading: (state) => state.avatarLoading
}

// Mutations
const mutations = {
  setCharacter(state, character) {
    state.character = character
  },
  setErrorMessage(state, error) {
    state.error = error
  },
  setLoadingStatus(state, loading) {
    state.loading = loading
  },
  setAvatarLoading(state, avatarLoading) {
    state.avatarLoading = {
      ...state.avatarLoading,
      ...avatarLoading
    }
  }
}

// Actions
const actions = {
  resetStore({ commit }, id) {
    commit('setLoadingStatus', true)
    commit('setErrorMessage', '')
    commit('setCharacter', {})
    commit('setAvatarLoading', { [id]: true })
  },
  async loadCharacter({ dispatch, commit }, target) {
    dispatch('resetStore', target.id)

    try {
      commit('setLoadingStatus', true)
      const api = process.env.VUE_APP_API_ROOT

      const response = await axios.get(`${api}${target.id}`)

      if (response.data) {
        commit('setCharacter', response.data)
        commit('setErrorMessage', '')
      }
    } catch (error) {
      if (error.response.data.error) {
        commit('setErrorMessage', `<p class="pickle">${target.name}</p> must be a myth... We can't find anything!`)
      }

      console.error('Error happened while fetching character details via API', error)
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

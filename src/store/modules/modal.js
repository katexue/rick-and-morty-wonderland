const STATE = () => {
  return {
    isModalOpen: false
  }
}

const state = STATE()

// Getters
const getters = {
  getModalStatus: (state) => state.isModalOpen
}

// Mutations
const mutations = {
  setModalStatus(state, modalOpenStatus) {
    state.isModalOpen = modalOpenStatus
  }
}

// Actions
const actions = {
  closeModal({ commit }, callback) {
    commit('setModalStatus', false)

    if (typeof callback === 'function') {
      callback()
    }
  },
  openModal({ commit }, callback) {
    commit('setModalStatus', true)

    if (typeof callback === 'function') {
      callback()
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

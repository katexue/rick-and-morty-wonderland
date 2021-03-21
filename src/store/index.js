import { createStore } from 'vuex'

const modules = {}

// Separate STATE function for easier default state value reset.
const STATE = () => {}

const state = STATE()

const actions = {}

const mutations = {}

const getters = {}

const store = createStore({
  modules,
  actions,
  mutations,
  getters,
  state
})

export default store

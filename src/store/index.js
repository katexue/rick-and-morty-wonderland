import { createStore, createLogger } from 'vuex'
import characters from './modules/characters'
import character from './modules/character'
// import episode from './modules/episode'
// import modal from './modules/modal'

const modules = {
  characters,
  character
  // episode,
  // modal
}

// Separate STATE function for easier default state value reset.
const STATE = () => {}

const state = STATE()

const actions = {}

const mutations = {}

const getters = {}

// Add logger for easier debug as Vue.js devtool doesn't support vuex for vue3 atm (sad...)
const plugins = process.env.NODE_ENV === 'development' ? [createLogger()] : []

const store = createStore({
  plugins,
  modules,
  actions,
  mutations,
  getters,
  state
})

export default store

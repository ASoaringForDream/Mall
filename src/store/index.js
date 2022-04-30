import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters,
  mutations,
  actions
})
export default store
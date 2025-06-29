import { createStore } from 'vuex'
import menu from './menu'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    plugins: [new createPersistedState({
        storage: window.localStorage,
        key: 'v3pz'
    })],
    modules: {
        menu
    }
})
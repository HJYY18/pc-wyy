import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import searchModule from './modules/search'
import musicModule from './modules/music'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user:userModule,
        search:searchModule,
        music:musicModule
    }
})
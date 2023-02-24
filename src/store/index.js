import Vue from "vue";
import Vuex from "vuex";
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'
import * as notification from '@/store/modules/notification.js'
import  axios  from "axios"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:null,
    categories:['sustainability'
    ,'nature'
    ,'animal welfare'
    ,'housing'
    ,'education'
    ,'food'
    ,'community']
  },

  modules: {user,event,notification},

  mutations:{
    SET_USER_DATA(state,userData){
      state.user=userData
      localStorage.setItem('user',JSON.stringify(userData))
      axios.defaults.headers.common['Authorization']=
      `Bearer ${userData.token}`
    },
    LOGOUT(state){
          state.user =null
          localStorage.removeItem('user')
       location.reload()
    }
  },


  actions:{
    register({commit},credentials){
    return axios
    .post('http://localhost:3000/register',credentials )
    .then(({data})=>{
      console.log('user data is:',data)
      commit('SET_USER_DATA',data)
    })
  },
  login({commit},credentials){
    return axios
            .post('http://localhost:3000/login',credentials )
            .then(({data})=>{
              commit('SET_USER_DATA',data)
            })
  },
  logout({commit}){
    commit('LOGOUT')
  }
 
},
getters:{
  loggedIn(state){
    return !!state.user
  }
}

});
import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        user_name: localStorage.getItem('user_name') ? localStorage.getItem('user_name') : '',
        user_id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : '',
        user_img: localStorage.getItem('user_img') ? localStorage.getItem('user_img') : '',
        admin: localStorage.getItem('admin') ? localStorage.getItem('admin') : '',
        address: localStorage.getItem('address') ? localStorage.getItem('address') : '',
        user_age: localStorage.getItem('user_age') ? localStorage.getItem('user_age') : '',
        user_gender: localStorage.getItem('user_gender') ? localStorage.getItem('user_gender') : ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token.token);
        },
        setUser(state, user) {
            state.user_name = user.user.user_name;
            state.user_id = user.user.user_id;
            state.user_img = user.user.user_img;
            state.admin = user.user.admin;
            state.address = user.user.address;
            state.user_gender = user.user.user_gender;
            state.user_age = user.user.user_age;
            localStorage.setItem("user_name", user.user.user_name);
            localStorage.setItem("user_id", user.user.user_id);
            localStorage.setItem("user_img", user.user.user_img);
            localStorage.setItem("admin", user.user.admin);
            localStorage.setItem("address", user.user.address);
            localStorage.setItem("user_gender", user.user.user_gender);
            localStorage.setItem("user_age", user.user.user_age);
        },
        setPicture(state, user_img) {
            state.user_img = user_img;
            localStorage.setItem("user_img", user_img);
        },
        delToken(state) {
            state.token = '';
            state.user_name = '';
            state.user_id = '';
            state.user_img = '';
            state.admin = '';
            state.address = '';
            state.user_age='';
            state.user_gender='';
            localStorage.clear();
        }
    },
    getters:{
      getUser:function (state) {
          return state;
      },
      getToken:function (state) {
          return state.token;
      }


    }
})

export default store;

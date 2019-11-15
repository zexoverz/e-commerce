import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: null,
        products: [],
        nameLogin: ""
    },
    mutations: {
        SET_LOGIN(state) {
            if (localStorage.getItem("token")) {
                state.isLogin = localStorage.getItem("token");
                state.nameLogin = localStorage.getItem("username");
            } else {
                state.isLogin = null;
            }
        },
        SET_PRODUCTS(state, payload) {
            state.products = payload
        },


    },
    actions: {
        login(context, payload) {
            console.log(payload);
            return axios({
                method: "post",
                url: "http://localhost:3000/user/login",
                data: payload
            })

        },
        getProducts({
            commit
        }) {
            axios({
                url: "http://localhost:3000/product/",
                method: "GET",
            }).then(response => {
                commit("SET_PRODUCTS", response.data)
            }).catch((err) => {
                console.log(err);
            })
        },
        createProduct(context, payload) {
            return axios({
                url: "http://localhost:3000/product/",
                method: "POST",
                data: payload,
                headers: {
                    token: localStorage.getItem("token")
                }
            })

        },


    }
});
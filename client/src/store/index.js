import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: null,
        products: [],
        nameLogin: "",
        cart: {
            listProduct: [],
            totalCost: 0,
            status: "unpaid"
        }
    },
    mutations: {
        SET_LOGIN(state) {
            if (localStorage.getItem("token")) {
                state.isLogin = localStorage.getItem("token");
                state.nameLogin = localStorage.getItem("username");

            } else {
                state.isLogin = null;
                state.cart = {
                    listProduct: [],
                    totalCost: 0,
                    status: "unpaid"
                }
            }
        },
        SET_PRODUCTS(state, payload) {
            state.products = payload
        },
        SET_TRANSACTION(state, payload) {
            if (payload.listProduct.length > 1) {
                let cost = 0;
                for (let i = 0; i < payload.listProduct.length; i++) {
                    payload.listProduct[i].total = payload.listProduct[i].price * payload.listProduct[i].quantity
                    cost += payload.listProduct[i].total;
                }
                payload.totalCost = cost
                state.cart = payload
            } else {

                state.cart = payload
            }

        }


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

        register(context, payload) {
            return axios({
                method: "post",
                url: "http://localhost:3000/user/register",
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

        getTransactions(context) {
            axios({
                url: "http://localhost:3000/transaction/",
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(response => {
                let transactionsData = response.data
                let isUnpaid = false;

                for (let i = 0; i < transactionsData.length; i++) {
                    if (transactionsData[i].status === "unpaid") {
                        isUnpaid = true
                        context.commit("SET_TRANSACTION", transactionsData[i])
                        break;
                    }
                }

                if (!isUnpaid) {
                    context.dispatch("createTransaction");
                }
            }).catch((err) => {
                console.log(err);
            })
        },

        createTransaction({
            commit
        }) {
            axios({
                url: "http://localhost:3000/transaction/",
                method: "POST",
                data: {
                    listProduct: [],
                    totalCost: 0,
                    status: "unpaid"
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(response => {
                commit("SET_TRANSACTION", response.data);
            }).catch(err => {
                console.log(err);
            })
        },

        cartUpdate(context, payload) {
            axios({
                url: `http://localhost:3000/transaction/${context.state.cart._id}`,
                method: "PUT",
                data: {
                    listProduct: payload.listProduct,
                    totalCost: payload.totalCost
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(() => {
                context.dispatch("getTransactions");
            })
        }


    }
});
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const baseUrl = "http://localhost:3400"


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
        },
        transactionPaid: []
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
                    console.log(payload.listProduct[i].stock);
                    payload.listProduct[i].total = payload.listProduct[i].price * payload.listProduct[i].quantity
                    cost += payload.listProduct[i].total;
                }
                payload.totalCost = cost
                state.cart = payload
            } else {

                state.cart = payload
            }

        },

        SET_TRANSACTION_HISTORY(state, payload) {
            state.transactionPaid = payload;
        }

        
    },
    actions: {
        login(context, payload) {

            return axios({
                method: "post",
                url: `${baseUrl}/user/login`,
                data: payload
            })

        },

        register(context, payload) {
            return axios({
                method: "post",
                url: `${baseUrl}/user/register`,
                data: payload
            })
        },
        getProducts({
            commit
        }) {
            axios({
                url: `${baseUrl}/product/`,
                method: "GET",
            }).then(response => {
                commit("SET_PRODUCTS", response.data)
            }).catch((err) => {
                console.log(err);
            })
        },
        createProduct(context, payload) {
            return axios({
                url: `${baseUrl}/product/`,
                method: "POST",
                data: payload,
                headers: {
                    token: localStorage.getItem("token")
                }
            })

        },

        getTransactions(context) {
            axios({
                url: `${baseUrl}/transaction/`,
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
                url: `${baseUrl}/transaction/`,
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
                url: `${baseUrl}/transaction/${context.state.cart._id}`,
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
        },

        updateProduct(context, payload) {
            if (payload.quantity) {
                let productTemp = context.state.products
                let stock = null
                for (let i = 0; i < productTemp.length; i++) {
                    if (productTemp[i]._id === payload._id) {
                        stock = productTemp[i].stock;
                    }
                }
                stock -= payload.quantity;
                payload.stock = stock;
            }

            return axios({
                url: `${baseUrl}/product/${payload._id}`,
                method: "PUT",
                data: {
                    name: payload.name,
                    price: payload.price,
                    stock: payload.stock
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
        },

        paidTransaction(context, payload) {
            return axios({
                url: `${baseUrl}/transaction/${payload}`,
                method: "PATCH",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
        },

        getTransactionHistory({
            commit
        }) {
            axios({
                url: `${baseUrl}/transaction`,
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(response => {
                let transactionHistory = response.data
                let transactionPaid = [];
                for (let i = 0; i < transactionHistory.length; i++) {
                    if (transactionHistory[i].status === "paid") {
                        transactionPaid.push(transactionHistory[i]);
                    }
                }
                console.log(transactionPaid)

                commit("SET_TRANSACTION_HISTORY", transactionPaid);

            }).catch(err => {
                console.log(err);
            })
        },

        deleteProduct(context, payload) {
            axios({
                url: `${baseUrl}/product/${payload}`,
                method: "DELETE",
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(() => {
                context.dispatch("getProducts");
            })
        }


    }
});
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: () =>
      import( /* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import( /* webpackChunkName: "login" */ "../views/LoginForm.vue")
  },
  {
    path: "/register",
    name: "register",

    component: () =>
      import( /* webpackChunkName: "register" */ "../views/RegisterForm.vue")
  },
  {
    path: "/product",
    name: "product",
    component: () =>
      import( /* webpackChunkName: "product" */ "../views/ListProduct.vue")

  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import( /* webpackChunkName: "cart" */ "../views/Cart.vue")
  },
  {
    path: "/transactions",
    name: "transactions",
    component: () =>
      import( /* webpackChunkName: "product" */ "../views/Transactions.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
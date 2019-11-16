<template>
  <header class="header_area">
    <div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand logo_h" href="index.html">
            <!-- <img src="img/logo.png" alt /> -->
            Gelato
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav ml-auto mr-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item submenu dropdown">
                <a
                  href="#"
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Shop</a>
                <ul class="dropdown-menu">
                  <li class="nav-item">
                    <router-link to="/product" class="nav-link">Product Details</router-link>
                  </li>

                  <li class="nav-item">
                    <router-link
                      to="/transactions"
                      v-if="isLogin && nameLogin !== 'admin'"
                      class="nav-link"
                    >Transaction History</router-link>
                  </li>

                  <li class="nav-item">
                    <router-link to="/cart" class="nav-link">Shopping Cart</router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-item submenu" v-if="!isLogin">
                <router-link
                  to="/login"
                  href="#"
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Login</router-link>
              </li>
              <li class="nav-item submenu" v-if="!isLogin">
                <router-link
                  to="/register"
                  href="#"
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Register</router-link>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact</a>
              </li>-->
            </ul>

            <ul class="nav-shop">
              <li class="nav-item">
                <button>
                  <i class="ti-search"></i>
                </button>
              </li>
              <li class="nav-item">
                <button v-if="isLogin" @click="cartEvent">
                  <i class="ti-shopping-cart"></i>
                  <span class="nav-shop__circle">{{cart.listProduct.length}}</span>
                </button>
              </li>
              <li class="nav-item">
                <a class="button button-header" v-if="isLogin" href="#" @click="logout">Sign Out</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-if="isLogin" href="#">{{nameLogin}}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Are you sure to logout ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          this.$store.commit("SET_LOGIN");
          Swal.fire("Good job!", "Logout Success", "success");
        }
      });
    },

    cartEvent() {
      this.$router.push("/cart");
    }
  },
  computed: mapState(["isLogin", "nameLogin", "cart"])
};
</script>

<style></style>

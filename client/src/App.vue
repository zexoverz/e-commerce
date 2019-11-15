<template>
  <div id="app">
    <div id="nav">
      <navBar></navBar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import navBar from "./components/navBar";

export default {
  data() {
    return {};
  },

  methods: {},
  components: {
    navBar
  },
  computed: mapState(["isLogin"]),
  created() {
    this.$store.commit("SET_LOGIN");
    if (localStorage.getItem("token")) {
      this.$store.dispatch("getTransactions");
    }
  }
};
</script>

<style lang="scss"></style>

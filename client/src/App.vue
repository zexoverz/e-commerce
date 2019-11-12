<template>
  <div id="app">
    <div id="nav">
      <navBar></navBar>
    </div>
    <router-view />
  </div>
</template>

<script>
import navBar from "./components/navBar";

export default {
  data() {
    return {};
  },
  components: {
    navBar
  }
};
</script>

<style lang="scss"></style>

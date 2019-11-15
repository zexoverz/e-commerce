<template>
  <div class="home">
    <!-- <navBar></navBar> -->

    <main class="site-main">
      <!--================ Hero banner start =================-->
      <Header></Header>
      <Carousel></Carousel>
      <Offer></Offer>
      <Footer></Footer>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Offer from "../components/Offer";
import Footer from "../components/Footer";

export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Header,
    Carousel,
    Offer,

    Footer
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  created() {
    this.$store.commit("SET_LOGIN");
    this.$store.dispatch("getProducts");
  }
};
</script>

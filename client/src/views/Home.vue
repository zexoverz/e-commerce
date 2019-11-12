<template>
  <div class="home">
    <!-- <navBar></navBar> -->

    <main class="site-main">
      <!--================ Hero banner start =================-->
      <Header></Header>
      <Carousel></Carousel>
      <Offer></Offer>
      <ListProduct></ListProduct>

      <Footer></Footer>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Offer from "../components/Offer";
import ListProduct from "../components/ListProduct";
import Footer from "../components/Footer";

export default {
  name: "home",
  data() {
    return {
      isLogin: null
    };
  },
  components: {
    Header,
    Carousel,
    Offer,
    ListProduct,
    Footer
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = localStorage.getItem("token");
    } else {
      this.isLogin = null;
    }
  }
};
</script>

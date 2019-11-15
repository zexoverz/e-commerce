<template>
  <div>
    <!-- <section class="blog-banner-area" id="category">
      <div class="container h-100">
        <div class="blog-banner">
          <div class="text-center">
            <h1>Shopping Cart</h1>
            <nav aria-label="breadcrumb" class="banner-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>-->
    <!-- ================ end banner area ================= -->

    <!--================Cart Area =================-->
    <section class="cart_area">
      <div class="container">
        <div class="cart_inner">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.listProduct" :key="item._id">
                  <td>
                    <div class="media">
                      <div class="d-flex">
                        <img :src="item.img" alt width="100px" />
                      </div>
                      <div class="media-body">
                        <p>{{item.name}}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h5>${{item.price}}.00</h5>
                  </td>
                  <td>
                    <div class="product_count">
                      <!-- <input
                        type="text"
                        name="qty"
                        id="sst"
                        maxlength="12"
                        value="1"
                        title="Quantity:"
                        class="input-text qty"
                      />-->
                      <div class="input-text qty ml-3">{{item.quantity}}</div>
                    </div>
                  </td>
                  <td>
                    <h5>${{item.total}}.00</h5>
                  </td>

                  <td>
                    <button class="button btn btn-danger" @click="deleteItem(item._id)">Delete</button>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <h5>Subtotal</h5>
                  </td>
                  <td>
                    <h5>${{cart.totalCost}}.00</h5>
                  </td>
                </tr>

                <tr class="out_button_area">
                  <td class="d-none-l"></td>
                  <td class></td>
                  <td></td>
                  <td>
                    <div class="checkout_btn_inner d-flex align-items-center">
                      <!-- <a class="gray_btn" href="#">Continue Shopping</a> -->
                      <router-link to="/product" class="gray_btn">Continue Shopping</router-link>
                      <!-- <a class="primary-btn ml-2" href="#">Proceed to checkout</a> -->
                      <router-link to="/checkout" class="primary-btn ml-2">Proceed to checkout</router-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  computed: mapState(["cart"]),
  methods: {
    deleteItem(id) {
      let cartTemp = this.cart;
      let cartDelete = cartTemp.listProduct;

      for (let i = 0; i < cartDelete.length; i++) {
        if (cartDelete[i]._id === id) {
          cartDelete.splice(i, 1);
        }
      }
      cartTemp.listProduct = cartDelete;
      this.$store.dispatch("cartUpdate", cartTemp);
      Swal.fire("Good job!", "Delete Success", "success");
    }
  },
  created() {
    this.$store.dispatch("getProducts");
    this.$store.commit("SET_LOGIN");
    if (localStorage.getItem("token")) {
      this.$store.dispatch("getTransactions");
    }
  }
};
</script>

<style>
</style>
<template>
  <section class="order_details section-margin--small">
    <div class="container">
      <p class="text-center billing-alert">Thank you. Your order has been received.</p>

      <div
        class="order_details_table"
        v-for="transaction in transactionPaid"
        :key="transaction._id"
      >
        <h2>Order Details</h2>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in transaction.listProduct" :key="item._id">
                <td>
                  <p>{{item.name}}</p>
                </td>
                <td>
                  <h5>x {{item.quantity}}</h5>
                </td>
                <td>
                  <p>${{item.total}}.00</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Subtotal</h4>
                </td>
                <td>
                  <h5></h5>
                </td>
                <td>
                  <p>${{transaction.totalCost}}.00</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Shipping</h4>
                </td>
                <td>
                  <h5></h5>
                </td>
                <td>
                  <p>Flat rate: $3.00</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Total</h4>
                </td>
                <td>
                  <h5></h5>
                </td>
                <td>
                  <h4>${{transaction.totalCost + 3}}.00</h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    console.log("masuk");
    this.$store.dispatch("getTransactionHistory");
  },
  computed: mapState(["transactionPaid"])
};
</script>

<style>
</style>
<template>
  <section class="section-margin calc-60px">
    <div class="container">
      <div class="section-intro pb-60px">
        <p>Gelato Ice Cream</p>
        <div class="row">
          <h2 style="margin-left: 15px">
            Product
            <span class="section-intro__style">List</span>
          </h2>
          <button
            class="btn btn-success"
            style="margin-left: 100px"
            v-if="nameLogin === 'admin'"
            data-toggle="modal"
            data-target="#createModal"
          >Create Product</button>

          <div class="modal" id="createModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Create Product</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputName">Name Product</label>
                      <input
                        type="text"
                        v-model="name"
                        class="form-control"
                        id="exampleInputName"
                        placeholder="Enter name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputType">Type</label>
                      <input
                        type="text"
                        v-model="typeProduct"
                        class="form-control"
                        id="exampleInputType"
                        placeholder="Enter Type"
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputType">Price</label>
                      <input
                        type="number"
                        v-model="price"
                        class="form-control"
                        id="exampleInputPrice"
                        placeholder="Enter Price"
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleFormControlFile1">Img file input</label>
                      <input
                        type="file"
                        v-on:change="handleFileEditor"
                        class="form-control-file"
                        id="exampleFormControlFile1"
                      />
                    </div>

                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      @click="createProduct"
                    >Submit</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="bestSellerCarousel" class="row">
        <div
          class="card text-center card-product col-md-4"
          v-for="product in products"
          :key="product._id"
        >
          <div class="card-product__img">
            <img class="img-fluid" :src="product.img" alt />
            <ul class="card-product__imgOverlay">
              <!-- <li>
                <button>
                  <i class="ti-search"></i>
                </button>
              </li>-->
              <li>
                <button @click="addItem(product._id)">
                  <i class="ti-shopping-cart"></i>
                </button>
              </li>
              <!-- <li>
                <button>
                  <i class="ti-heart"></i>
                </button>
              </li>-->
            </ul>
          </div>
          <div class="card-body">
            <p>{{product.typeProduct}}</p>
            <h4 class="card-product__title">{{product.name}}</h4>
            <p class="card-product__price">${{product.price}}.00</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      typeProduct: "",
      price: "",
      imgFile: ""
    };
  },
  methods: {
    handleFileEditor() {
      this.imgFile = event.target.files[0];
    },

    createProduct() {
      let formData = new FormData();

      formData.append("name", this.name);
      formData.append("typeProduct", this.typeProduct);
      formData.append("price", this.price);
      formData.append("img", this.imgFile);

      this.$store.dispatch("createProduct", formData).then(() => {
        Swal.fire({
          title: "Success",
          text: "add Product Success",
          icon: "success"
        });
        this.$store.dispatch("getProducts");
      });
    },

    addItem() {
      if (localStorage.getItem("token") && this.nameLogin !== "admin") {
        Swal.fire({
          title: "Success",
          text: "add Item to Cart Success",
          icon: "success"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must Login First!"
        });
      }
    }
  },

  created() {
    this.$store.dispatch("getProducts");

    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i]);
    }
  },
  computed: mapState(["products", "nameLogin"])
};
</script>

<style scoped>
.img-fluid {
  width: 200px;
  height: 200px;
}
</style>

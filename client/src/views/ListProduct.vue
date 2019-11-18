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
            v-if="nameLogin === 'admin' && isLogin"
            data-toggle="modal"
            data-target="#createModal"
          >Create Product</button>
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
              <li>
                <!-- <button>
                  <i class="ti-search"></i>
                </button>-->
                <button
                  class="button btn btn-primary"
                  v-if="nameLogin === 'admin' && isLogin"
                  data-toggle="modal"
                  :data-target="'#edit' + product._id"
                >Edit</button>
              </li>
              <li>
                <button @click="addItem(product)">
                  <i class="ti-shopping-cart"></i>
                </button>
              </li>
              <li>
                <!-- <button>
                  <i class="ti-heart"></i>
                </button>-->
                <button
                  class="button btn btn-danger"
                  v-if="nameLogin === 'admin' && isLogin"
                  @click="deleteProduct(product._id)"
                >Delete</button>
              </li>
            </ul>
          </div>

          <div class="modal fade" :id="'edit' + product._id" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Edit Product</h5>
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
                        v-model="nameEdit"
                        class="form-control"
                        id="exampleInputName"
                        placeholder="Enter name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputType">Stock</label>
                      <input
                        type="number"
                        v-model="stockEdit"
                        class="form-control"
                        id="exampleInputStock"
                        placeholder="Enter Stock"
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputType">Price</label>
                      <input
                        type="number"
                        v-model="priceEdit"
                        class="form-control"
                        id="exampleInputPrice"
                        placeholder="Enter Price"
                      />
                    </div>

                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      @click="editProduct(product._id)"
                    >Submit</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p>Stock: {{product.stock}}</p>
            <h4 class="card-product__title">{{product.name}}</h4>
            <p class="card-product__price">${{product.price}}.00</p>
          </div>
        </div>
      </div>
    </div>

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
                <label for="exampleInputStock">Stock</label>
                <input
                  type="number"
                  v-model="stock"
                  class="form-control"
                  id="exampleInputType"
                  placeholder="Enter Stock"
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
  </section>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      stock: "",
      price: "",
      imgFile: "",
      nameEdit: "",
      stockEdit: "",
      priceEdit: ""
    };
  },
  methods: {
    handleFileEditor() {
      this.imgFile = event.target.files[0];
    },

    createProduct() {
      let formData = new FormData();

      formData.append("name", this.name);
      formData.append("stock", this.stock);
      formData.append("price", this.price);
      formData.append("img", this.imgFile);
      Swal.fire({
        title: "Loading"
      });
      Swal.showLoading();
      this.$store.dispatch("createProduct", formData).then(() => {
        Swal.close();
        Swal.fire({
          title: "Success",
          text: "add Product Success",
          icon: "success"
        });
        this.$store.dispatch("getProducts");
      });
    },

    addItem(product) {
      if (localStorage.getItem("token") && this.nameLogin !== "admin") {
        let addCart = this.cart;
        let list = addCart.listProduct;
        let isExist = false;

        for (let i = 0; i < list.length; i++) {
          if (list[i]._id === product._id) {
            list[i].quantity += 1;
            isExist = true;
          }
        }

        if (!isExist) {
          product.quantity = 1;
          addCart.listProduct.push(product);
        }

        this.$store.dispatch("cartUpdate", addCart);
        Swal.fire({
          title: "Success",
          text: "Add Item To Cart Success",
          icon: "success"
        });
      } else if (localStorage.getItem("token") && this.nameLogin === "admin") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Only User Can Add Item To Cart !!"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must Login First!"
        });
      }
    },

    editProduct(id) {
      let obj = {
        _id: id,
        name: this.nameEdit,
        stock: this.stockEdit,
        price: this.priceEdit
      };

      this.$store.dispatch("updateProduct", obj).then(() => {
        this.$store.dispatch("getProducts");
        Swal.fire({
          title: "Success",
          text: "Update item Success",
          icon: "success"
        });
      });
    },

    deleteProduct(id) {
      Swal.fire({
        title: "Are you sure to delete this product ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("deleteProduct", id);
          Swal.fire({
            title: "Success",
            text: "Delete item Success",
            icon: "success"
          });
        }
      });
    }
  },

  created() {
    this.$store.dispatch("getProducts");
    this.$store.commit("SET_LOGIN");
    if (localStorage.getItem("token")) {
      this.$store.dispatch("getTransactions");
    }
  },
  computed: mapState(["products", "nameLogin", "isLogin", "cart"])
};
</script>

<style scoped>
.img-fluid {
  width: 200px;
  height: 200px;
}
</style>

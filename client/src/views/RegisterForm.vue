<template>
  <div>
    <!-- <section class="blog-banner-area" id="category">
      <div class="container h-100">
        <div class="blog-banner">
          <div class="text-center">
            <h1>Register</h1>
            <nav aria-label="breadcrumb" class="banner-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Register</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>-->
    <!-- ================ end banner area ================= -->

    <!--================Login Box Area =================-->
    <section class="login_box_area section-margin">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="login_box_img">
              <div class="hover">
                <h4>Already have an account?</h4>
                <p>
                  There are advances being made in science and technology
                  everyday, and a good example of this is the
                </p>
                <router-link to="/login" class="button button-account">Login Now</router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="login_form_inner register_form_inner">
              <h3>Create an account</h3>
              <form class="row login_form" action="#/" id="register_form">
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    v-model="name"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Name'"
                  />
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="email"
                    v-model="email"
                    placeholder="Email Address"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Email Address'"
                  />
                </div>
                <div class="col-md-12 form-group">
                  <input
                    type="text"
                    class="form-control"
                    id="password"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Password'"
                  />
                </div>

                <div class="col-md-12 form-group">
                  <div class="creat_account">
                    <input type="checkbox" id="f-option2" name="selector" />
                    <label for="f-option2">Keep me logged in</label>
                  </div>
                </div>
                <div class="col-md-12 form-group">
                  <button
                    type="button"
                    class="button button-register w-100"
                    @click="register"
                  >Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      let obj = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.$store
        .dispatch("register", obj)
        .then(() => {
          Swal.fire("Good job!", "Register Success", "success");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Register Failed!"
          });
        });
    }
  }
};
</script>

<style></style>

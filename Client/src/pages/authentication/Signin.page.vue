<template>
  <div id="form-wrapper">
    <div class="title">Signin</div>
    <Form @submit="handleLogin" :validation-schema="schema">
      <div class="form-group">
        <label for="email">Email</label>
        <Field name="email" type="email" class="form-control" placeholder="email"/>
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <Field name="password" type="password" class="form-control" placeholder="password"/>
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-group">
        <button class="button-52" :disabled="loading">
          <span
            v-show="loading"
          ><div class="lds-ring"><div></div><div></div><div></div><div></div></div></span>
          <span>Login</span>
        </button>
      </div>

      <!-- <div class="form-group form-message">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div> -->
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import "./Signin.css";
import { useToast } from 'vue-toastification';

const toast = useToast(); 

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast(error.response.data.message, { type:"error" });
        }
      );
    },
  },
};
</script>
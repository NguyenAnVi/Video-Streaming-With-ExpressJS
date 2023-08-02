<template>
  <div id="form-wrapper">
    <div class="title">Signup</div>
    <Form @submit="handleRegister" :validation-schema="schema">
      <div v-if="!successful" class="form-group">
        <label for="name">Name</label>
        <Field name="name" type="text" class="form-control" />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="email">Email</label>
        <Field name="email" type="email" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="phone">Phone</label>
        <Field name="phone" type="text" class="form-control" />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="password">Password</label>
        <Field name="password" type="password" class="form-control" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div v-if="!successful" class="form-group">
        <label for="confirmpassword">Password confirm</label>
        <Field name="confirmpassword" type="password" class="form-control" />
        <ErrorMessage name="confirmpassword" class="error-feedback" />
      </div>

      <div v-if="!successful" class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          Sign Up
        </button>
      </div>
    </Form>

    <!-- <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div> -->
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import "./Signup.css";
import {useToast} from "vue-toastification";

const toast = useToast();

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      phone: yup
        .string()
        .required("Phone is required!")
        .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Phone number is not valid'),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      confirmpassword: yup
        .string()
        .required("Confirm Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!")
        .oneOf([yup.ref('password')], 'Passwords must match')
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/signin");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/signin");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            toast(error.response.data.message, {type:"error"});
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
import { createStore } from "vuex";
import { auth } from "./auth.module.js";
import { video } from "./video.module.js";

const store = createStore({
  modules: {
    auth,
    video
  },
});

export default store;
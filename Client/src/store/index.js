import { createStore } from "vuex";
import { auth } from "./auth.module.js";
import { video } from "./video.module.js";
import { notification } from "./notification.module.js";

const store = createStore({
  modules: {
    auth,
    video,
    notification
  },
});

export default store;
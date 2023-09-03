import { createStore } from "vuex";
import { auth } from "./auth.module.js";
import { video } from "./video.module.js";
import { account } from "./account.module.js";
import { notification } from "./notification.module.js";

const store = createStore({
  modules: {
    auth,
    video,
    account,
    notification
  },
});

export default store;
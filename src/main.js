import { createApp } from "vue";
import App from "./App.vue";
// import "remixicon/fonts/remixicon.css";
import "./index.css";

const app = createApp(App);
// Register a global custom directive called `v-focus`

app.directive("modal-show", {
  mounted(el, binding, vnode) {
    el.addEventListener("click", () => {
      console.log({ el }, { binding }, vnode);
      const context = binding.instance;
      console.log("CONTEXT", context);
      context.$refs.mtest.$refs.modalx.test = true;

      // console.log(modal);
      // const modal = context.$refs.modalx;
      // console.log(modal);
      // modal.test = true;
      // modal.show = true;
    });
  },
});

// createApp(App).mount("#app");
app.mount("#app");

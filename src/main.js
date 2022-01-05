import { createApp } from "vue";
import App from "./App.vue";
import "remixicon/fonts/remixicon.css";
import "./index.css";
import router from "./router.js";

createApp(App).use(router).mount("#app");

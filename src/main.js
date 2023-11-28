import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { VueFire, VueFireAuth } from "vuefire";

import { firebaseApp } from "./firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./styles.css";

const app = createApp(App);

app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})


app.mount("#app");

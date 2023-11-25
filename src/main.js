import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
// import { VueFire } from "vuefire";

// import { firebaseApp } from "./firebase";

const app = createApp(App);

app.use(router);
// app.use(VueFire, {
//   firebaseApp,
//   modules: [],
// })


app.mount("#app");

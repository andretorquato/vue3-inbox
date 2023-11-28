import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import MailView from "../views/Mail.vue";
import SendMailView from "../views/SendMail.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/auth", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/home", component: MailView },
  { path: "/send", component: SendMailView },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router as default };

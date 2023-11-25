const { createRouter, createWebHistory } = require("vue-router");

import LoginView from "../views/Login.vue";
import MailView from "../views/Mail.vue";

const routes = [
  { path: "/auth", component: LoginView },
  { path: "/", component: MailView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router as default };

import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import MailView from "../views/Mail.vue";
import SendMailView from "../views/SendMail.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/auth", component: LoginView, meta: { requireAuth: false } },
  { path: "/register", component: RegisterView, meta: { requireAuth: false } },
  { path: "/home", component: MailView, meta: { requireAuth: true } },
  { path: "/send", component: SendMailView, meta: { requireAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const user = sessionStorage.getItem('user')
  if (!to.meta.requireAuth && user) {
    next("/home");
  } else if (to.meta.requireAuth && user) {
    next();
  } else if (to.meta.requireAuth && !user) {
    next("/auth");
  } else {
    next();
  }
});
export { router as default };

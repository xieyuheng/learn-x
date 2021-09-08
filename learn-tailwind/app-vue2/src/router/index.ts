import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

// prettier-ignore
const router = new VueRouter({
  routes: [
    { path: "/", component: require("../views/home.vue").default },
    { path: "/home", component: require("../views/home.vue").default },
    { path: "/about", component: require("../views/about.vue").default },
    { path: "/chit-chat", component: require("../views/chit-chat.vue").default },
    { path: "/position-fixed", component: require("../views/position-fixed.vue").default },
    { path: "/position-sticky", component: require("../views/position-sticky.vue").default },
    { path: "/twind", component: require("../views/twind.vue").default },
  ],
})

export default router

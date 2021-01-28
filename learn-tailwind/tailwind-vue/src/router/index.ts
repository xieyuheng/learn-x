import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import ChitChat from "../views/ChitChat.vue"
import PositionFixed from "../views/PositionFixed.vue"
import PositionSticky from "../views/PositionSticky.vue"


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/Home" },
    { path: "/Home", component: Home },
    { path: "/About", component: About },
    { path: "/ChitChat", component: ChitChat },
    { path: "/PositionFixed", component: PositionFixed },
    { path: "/PositionSticky", component: PositionSticky },
  ],
})

export default router

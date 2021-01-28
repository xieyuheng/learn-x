import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import ChitChat from "../views/ChitChat.vue"
import PositionFixed from "../views/PositionFixed.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/", component: Home },
    { path: "/About", component: About },
    { path: "/ChitChat", component: ChitChat },
    { path: "/PositionFixed", component: PositionFixed },
  ],
})

export default router

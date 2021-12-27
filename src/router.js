import Vue from 'vue'
import VueRouter from  'vue-router'
import Posts from "./components/Posts";
import PostPage from "./components/PostPage";

Vue.use(VueRouter)

const routes = [
    {
        path: "/posts",
        component: Posts,
    },
    {
        path: "/",
        redirect: "/posts"
    },
    {
        path: "/posts/:id",
        component: PostPage,
    },
    {
        path: "*",
        component: { render: (h) => h("div", ["404! Page Not Found!"]) },
    },
]

const router = new VueRouter({
    routes,
    mode: "history",
})

export default router

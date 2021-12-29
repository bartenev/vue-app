import Vue from 'vue'
import VueRouter from  'vue-router'
import Posts from "./components/Posts";
import PostPage from "./components/PostPage";
import Home from "./components/Home";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            layout: "AppLayoutDefault"
        }
    },

    {
        path: "/posts",
        name: "Posts",
        component: Posts,
        meta: {
            layout: "AppLayoutDefault"
        }
    },

    {
        path: "/posts/:id",
        name: "PostPage",
        component: PostPage,
        meta: {
            layout: "AppLayoutDefault"
        },
    },

    // {
    //     path: "/",
    //     redirect: "/posts",
    // },

    {
        path: "*",
        name: "PageNotFound",
        component: { render: (h) => h("div", ["404! Page Not Found!"]) },
    },
]

const router = new VueRouter({
    routes,
    mode: "history",
})

export default router

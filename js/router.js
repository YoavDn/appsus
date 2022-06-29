
import homePage from "./pages/home-page.cmp.js"


const routes = [

    {
        path: '/',
        components: homePage
    }
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})
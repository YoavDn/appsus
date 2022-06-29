
import homePage from "./pages/app-home.cmp.js"
import mailPage from "./apps/mail/pages/app-mail.cmp.js"
import keepPage from "./apps/keep/pages/app-keep.cmp.js"


const routes = [
    {
        path:"/",
        component: homePage,
    },  
    {
        path:"/mail",
        component: mailPage,
    },
     {
        path:"/keep",
        component: keepPage,
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})
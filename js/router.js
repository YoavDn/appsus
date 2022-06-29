
import homePage from "./pages/app-home.cmp.js"
import mailPage from "./apps/mail/pages/mail-index.cmp.js"
import keepPage from "./apps/keep/pages/note-index.cmp.js"
import mailDetails from "./apps/mail/pages/mail-details.cmp.js"
import mailList from "./apps/mail/cmps/mail-list.cmp.js"


const routes = [
    {
        path: "/",
        component: homePage,
    },
    {
        path: "/mail",
        component: mailPage,
        children: [
            {
                path: 'mails',
                component: mailList,
                props: true
            },
            {
                path: ':mailId',
                component: mailDetails,
            },
        ]
    },

    {
        path: "/keep",
        component: keepPage,
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})

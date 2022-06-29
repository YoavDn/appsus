const { createApp } = Vue
import { router } from './router.js';

import appHeader from './cmps/app-header.cmp.js'
import homePage from './pages/app-home.cmp.js'
import mailPage from './apps/mail/pages/app-mail.cmp.js'
import keepPage from './apps/keep/pages/app-keep.cmp.js'


const options =  {
    template: `
    <app-header/>
    <router-view/>
    `,
    components: {
        appHeader,
        homePage,
        mailPage,
        keepPage,
    },
}






const app = createApp(options)
app.use(router)

app.mount('#app')

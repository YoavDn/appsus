const { createApp } = Vue
import { router } from './router.js';

import appHeader from './cmps/app-header.cmp.js'
import homePage from './pages/home-page.cmp.js'


const options =  {
    template: `
    <app-header/>
    <router-view/>
    `,
    components: {
        appHeader,
        homePage,
    },
}






const app = createApp(options)
app.use(router)

app.mount('#app')

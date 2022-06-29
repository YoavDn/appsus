const { createApp } = Vue
import { router } from './router.js';

import appHeader from './cmps/app-header.cmp.js'


const options =  {
    template: `
    <app-header/>
    <router-view/>
    `,
    components: {
        appHeader,
    },
}






const app = createApp(options)
app.use(router)

app.mount('#app')

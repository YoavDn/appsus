const { createApp } = Vue
import { router } from './router.js';

import appHeader from './cmps/app-header.cmp.js'
import popUpMsg from './cmps/pop-up-msg-cmp.js'

const options = {
    template: `
    <pop-up-msg/>
    <app-header/>
    <router-view/>
    `,
    components: {
        appHeader,
        popUpMsg,
    },
}

const app = createApp(options)
app.use(router)

app.mount('#app')

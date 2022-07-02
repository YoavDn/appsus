import { eventBus } from '../services/eventBus-service.js'
export default {
    template: `
    <section class="header-container">
        <header class="main-header flex space-between">
            
        <div  @click="goToHomePage" class="logo-box flex">
            <img src="assest/images/circles.svg" alt="">
    <h2 class="logo">Appsus </h2>

        </div>
            <nav class="main-nav">
                <ul class="nav-list flex" >
                    <router-link class="router-link mail-nav-link" to="/mail/mails">Mail <span v-if="unRead" class="header-notifictions">{{unRead}}</span></router-link>
                    <router-link class="router-link" to="/keep">Keep</router-link>
                    <router-link class="router-link" to="/book">Books</router-link>

                </ul>
            </nav>
        </header> 
    </section>
    `,
    data() {
        return {
            unRead: null,
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push('/')
        },
    },
    created() {
        eventBus.on('mail-unread', count => {
            if (count === 0) return this.unRead = null
            this.unRead = count
        })
    },

}

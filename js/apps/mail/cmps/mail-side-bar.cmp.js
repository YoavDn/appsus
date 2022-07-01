import { eventBus } from "../../../services/eventBus-service.js"

export default {
    emits: ['openNewMail'],
    props: ['mails'],
    template: `
    
    <section v-if="mails" class="side-bar" :class="sideBarStyle">
        <button class="compose-btn shadow" @click="toNewMail"> <span>&plus;</span> Compose</button>
        <div @click="activate" class="side-bar-items">
            <button :class="activeStyle"  @click="toList('inbox')" class="side-bar-btn bold"><span><i class="fa-solid fa-inbox"></i></span>Inbox <span>{{ureadCount}}</span></button>
            <button @click="toList('starred')" class="side-bar-btn"><span>&bigstar;</span>Starred</button>
            <button @click="toList('sent')" class="side-bar-btn"><span><i class="fa-solid fa-paper-plane"></i></span>Sent</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-file"></i></span>Drafts</button>
            <button @click="toList('trash')" class="side-bar-btn"><span><i class="fa-solid fa-trash"></i></span>Trash</button>
        </div>
    </section>
    <div v-if="sideBarOpen" class="overlay" @click="sideBarOpen = false"></div>
    `,
    data() {
        return {///
            activeSidebar: 'true',
            mobile: false,
            sideBarOpen: false
        }
    },
    methods: {
        toList(listType) {
            eventBus.emit('changeList', listType)
            this.$router.push('/mail/mails')
            this.activeSidebar = !this.activeSidebar
            this.sideBarOpen = false
        },

        activate(e) {
            if (!e.target.classList.contains('side-bar-btn')) return
            document.querySelectorAll('.side-bar-btn').forEach(el => el.classList.remove('active'))
            e.target.classList.add('active');

        },
        openSideBar() {
            this.sideBarOpen = true
        },
        toNewMail() {
            this.sideBarOpen = false
            this.$emit('openNewMail')
        }
    },
    computed: {
        ureadCount() {
            const count = this.mails.filter(mail => mail.isRead === false).length
            if (count === 0) return
            return count
        },
        activeStyle() {
            return { active: this.activeSidebar }
        },
        sideBarStyle() {
            return { open: this.sideBarOpen, }
        }

    },
    mounted() {
        if (document.body.clientWidth < 750) this.mobile = true
        eventBus.on('openSideBar', (boolean) => {
            this.sideBarOpen = boolean
        })
    }
}




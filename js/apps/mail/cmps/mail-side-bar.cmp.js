import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props: ['mails'],
    template: `
    
    <button v-if="mobile" @click="openSideBar" class="hamburger"><i class="fa-solid fa-bars"></i></button>
    <section v-if="mails" class="side-bar" :class="sideBarStyle">
        <button class="compose-btn shadow" @click="$emit('openNewMail')"> <span>&plus;</span> Compose</button>
        <div @click="activate" class="side-bar-items">
            <button :class="activeStyle"  @click="toInbox" class="side-bar-btn bold"><span><i class="fa-solid fa-inbox"></i></span>Inbox <span>{{ureadCount}}</span></button>
            <button @click="toStarredList" class="side-bar-btn"><span>&bigstar;</span>Starred</button>
            <button @click="toSent" class="side-bar-btn"><span><i class="fa-solid fa-paper-plane"></i></span>Sent</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-file"></i></span>Drafts</button>
            <button @click="toTrashList" class="side-bar-btn"><span><i class="fa-solid fa-trash"></i></span>Trash</button>
        </div>
    </section>
    <div v-if="sideBarOpen" class="overlay"></div>
    `,
    data() {
        return {
            activeSidebar: 'true',
            mobile: false,
            sideBarOpen: false
        }
    },
    methods: {
        toTrashList() {
            this.sideBarOpen = false
            eventBus.emit('changeList', 'trash')
        },
        toStarredList() {
            this.sideBarOpen = false
            eventBus.emit('changeList', 'starred')
        },
        toInbox() {
            this.sideBarOpen = false
            this.activeSidebar = !this.activeSidebar
            eventBus.emit('changeList', 'inbox')
        },
        toSent() {
            this.sideBarOpen = false
            eventBus.emit('changeList', 'sent')
        },
        activate(e) {
            if (!e.target.classList.contains('side-bar-btn')) return
            document.querySelectorAll('.side-bar-btn').forEach(el => el.classList.remove('active'))
            e.target.classList.add('active');

        },
        openSideBar() {
            this.sideBarOpen = true
        },
    },
    computed: {
        ureadCount() {
            return this.mails.filter(mail => mail.isRead === false).length
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
    }
}
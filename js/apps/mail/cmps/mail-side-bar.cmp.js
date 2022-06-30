import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props: ['mails'],
    template: `
    <section v-if="mails" class="side-bar">
        <button class="compose-btn shadow" @click="$emit('openNewMail')"> <span>&plus;</span> Compose</button>
        <div @click="activate" class="side-bar-items">
            <button :class="activeStyle"  @click="toInbox" class="side-bar-btn bold"><span><i class="fa-solid fa-inbox"></i></span>Inbox <span>{{ureadCount}}</span></button>
            <button @click="toStarredList" class="side-bar-btn"><span>&bigstar;</span>Starred</button>
            <button @click="toSent" class="side-bar-btn"><span><i class="fa-solid fa-paper-plane"></i></span>Sent</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-file"></i></span>Drafts</button>
            <button @click="toTrashList" class="side-bar-btn"><span><i class="fa-solid fa-trash"></i></span>Trash</button>
        </div>
    </section>
    `,
    data() {
        return {
            activeSidebar: 'true'
        }
    },
    methods: {
        toTrashList() {
            eventBus.emit('changeList', 'trash')
        },
        toStarredList() {
            eventBus.emit('changeList', 'starred')
        },
        toInbox() {
            this.activeSidebar = !this.activeSidebar
            eventBus.emit('changeList', 'inbox')
        },
        toSent() {
            eventBus.emit('changeList', 'sent')
        },
        activate(e) {
            if (!e.target.classList.contains('side-bar-btn')) return
            document.querySelectorAll('.side-bar-btn').forEach(el => el.classList.remove('active'))
            e.target.classList.add('active');

        },
    },
    computed: {
        ureadCount() {
            return this.mails.filter(mail => mail.isRead === false).length
        },
        activeStyle() {
            return { active: this.activeSidebar }
        }
    },
}
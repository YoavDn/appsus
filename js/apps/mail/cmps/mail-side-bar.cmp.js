import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props: ['mails'],
    template: `
    <section v-if="mails" class="mail-side-bar">
        <button class="compose-btn shadow" @click="$emit('openNewMail')"> <span>&plus;</span> Compose</button>
        <div class="side-bar-items">
            <button  @click="toInbox" class="side-bar-btn bold"><span><i class="fa-solid fa-inbox"></i></span>Inbox <span>{{ureadCount}}</span></button>
            <button @click="toStarredList" class="side-bar-btn"><span>&bigstar;</span>Starred</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-paper-plane"></i></span>Sent</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-file"></i></span>Drafts</button>
            <button @click="toTrashList" class="side-bar-btn"><span><i class="fa-solid fa-trash"></i></span>Trash</button>
        </div>
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        toTrashList() {
            eventBus.emit('changeList', 'mail moved to trash')
        },
        toStarredList() {
            eventBus.emit('changeList', 'starred')
        },
        toInbox() {
            eventBus.emit('changeList', 'inbox')
        }
    },
    computed: {
        ureadCount() {
            return this.mails.filter(mail => mail.isRead === false).length
        }
    },
}
import { eventBus } from "../../../services/eventBus-service.js";
import { mailService } from "../services/mail.service.js";


export default {
    template: `
    <section v-if="mail" class="mail-details">
        <nav class="details-nav flex space-arount">
            <router-link class="router-link back-to-inbox" to="/mail/mails">&leftarrow; Back to inbox</router-link>
            <div class="tool-nav">
                <button @click="mailAction('trash')" data-title="Move to trash" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                <button @click="mailAction('unread')" data-title="Mark as unread" class="delete-btn"><i class="fa-solid fa-envelope"></i></button>
            </div>
        </nav>
        <header class="details-header">
            <h2>{{mail.subject}}</h2>
        </header>
        <main class="main-details">
            <header class="main-details-header flex space-between">
                <div class="mail-user-details flex">
                    <img class="mail-details-avatar" :src="userAvatar" alt="">
                    <div class="detail-user-name flex-column">
                        <h2>{{mail.from}}</h2>
                        <p>to:{{mail.to}}</p>
                    </div>
                </div>
                <div class="details-date flex align-center">
                    <h2>{{stringDate}}</h2>
                </div>
            </header>
            <main class="details-body">
                <pre class="text-body">{{mail.body}}</pre>
            </main>
            
        </main>
    </section>
    `,
    data() {
        return {
            mail: null,
        }
    },
    created() {
        const id = this.$route.params.mailId;
        mailService.getMailById(id).then(mail => this.mail = mail)
    },

    methods: {
        mailAction(type) {
            if (type === 'unread') {
                this.mail.isRead = false
                eventBus.emit('update', this.mail)
                mailService.updateMail(this.mail)
                this.$router.push('/mail/mails')

            } else if (type === 'trash') {
                eventBus.emit('trashed', this.mail)
                mailService.moveToTrash(this.mail)
                this.$router.push(`/mail/mails`)
            }
        }
    },

    computed: {
        userAvatar() {
            const defaultUserImg = 'assest/images/user.png'
            return this.mail.avatar || defaultUserImg
        },
        stringDate() {
            const strDate = new Date(this.mail.sentAt).toLocaleString()
            return strDate
        }
    },

}
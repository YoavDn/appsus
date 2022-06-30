import { mailService } from '../services/mail.service.js'
import mailPreview from './mail-preview.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'



export default {
    template: `
        <section class="mail-list">
            <div v-for="mail in mailToShow" class="mail-item flex align-center"
            :class="{read: !mail.isRead}" 
            @click="selectMail(mail)">
            <mail-preview :mail="mail" @moveToTrash="toTrash(mail)" @markAsRead="markRead(mail)"/>
            </div>
        </section>  
    `,
    components: {
        mailPreview
    },

    data() {
        return {
            mails: null,
            hovered: false,
            activeList: null,
        }
    },
    created() {
        mailService.query().then(mails => {
            eventBus.on('changeList', (msg) => {
                this.activeList = msg
            })
            return this.mails = mails
        })
    },
    methods: {
        selectMail(mail) {
            mail.isRead = true
            mailService.updateMail(mail)
            this.$router.push(`/mail/${mail.id}`)
        },
        toTrash(mail) {
            mailService.moveToTrash(mail).then(mails => this.mails = mails)
        },
        markRead(mail) {
            mail.isRead = true
            mailService.updateMail(mail)
        }
    },

    computed: {
        mailToShow() {
            if (!this.mails) return
            return mailService.filterByActiveList(this.activeList, this.mails)
        }
    }
}


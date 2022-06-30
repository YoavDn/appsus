import { mailService } from '../services/mail.service.js'
import mailPreview from './mail-preview.cmp.js'
import mailFilter from './mail-filter.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'



export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <mail-filter :mails="mails" />
            <div v-for="mail in mailToShow" class="mail-item flex align-center"
            :class="{read: mail.isRead}" 
            @click="selectMail(mail)">
            <mail-preview :mail="mail" @movedToTrash="toTrash" @markAsRead="markRead(mail)"/>
            </div>
        </section>  
    `,
    components: {
        mailPreview,
        mailFilter,
    },

    data() {
        return {
            hovered: false,
            activeList: null,
        }
    },
    created() {
        eventBus.on('changeList', (msg) => {
            this.activeList = msg
        })
    },
    methods: {
        selectMail(mail) {
            mail.isRead = true
            mailService.updateMail(mail)
            this.$router.push(`/mail/${mail.id}`)
        },
        toTrash(mail) {
            this.$emit('trashed', mail)

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


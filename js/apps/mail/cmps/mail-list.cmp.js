import { mailService } from '../services/mail.service.js'
import mailPreview from './mail-preview.cmp.js'
import mailFilter from './mail-filter.cmp.js'
import { eventBus } from '../../../services/eventBus-service.js'



export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <mail-filter :mails="mails" />
            <button v-if="activeList === 'trash'" class="shadow clear-trash-btn" @click="clearTrash"><span><i class="fa-solid fa-trash"></i></span>Clear Trash  </button>
            <div v-if="mailToShow.length > 0" v-for="mail in mailToShow" class="mail-item flex align-center"
            :class="{read: mail.isRead}" 
            @click="selectMail(mail)">
            <mail-preview :mail="mail" @movedToTrash="toTrash" @markAsRead="markRead(mail)" @selectedMail="selected"/>
            </div>
             <div v-else class="no-result-msg">
                <h2>No Mails in {{activeList}}.</h2>  
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
            activeList: 'inbox',
            selectedMails: null
        }
    },
    created() {
        eventBus.on('update', mail => {
            const idx = this.mails.findIndex(m => m.id === mail.id);
            this.mails.splice(idx, 1, mail);
        })
        eventBus.on('trashed', mail => {
            const idx = this.mails.findIndex(m => m.id === mail.id);
            console.log(idx);
            this.mails.splice(idx, 1);
        })
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
        },
        clearTrash() {
            mailService.clearTrash()
        }
    },
    computed: {
        mailToShow() {
            if (!this.mails) return []
            return mailService.filterByActiveList(this.activeList, this.mails)
        }
    },

}


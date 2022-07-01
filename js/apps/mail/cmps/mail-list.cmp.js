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
            <nav v-if="isSelect" class="selected-actions">
                 <button @click="deleteSelected" data-tilte="Move to trash"><i class="fa-solid fa-trash"></i></button>
                 <button  @click="markSelected" data-tilte="Mark as read"><i class="fa-solid fa-envelope-open"></i></button>
            </nav>
            <div v-if="mailToShow.length > 0" v-for="mail in mailToShow" class="mail-item flex align-center"
            :class="{read: mail.isRead}" 
            @click="toMailDetails(mail)">
            <mail-preview :mail="mail" 
            @movedToTrash="toTrash" 
            @markAsRead="markRead(mail)"
            @selectedMail="selected(mail)"/>
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
            isSelect: false,
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
        toMailDetails(mail) {
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
            mailService.clearTrash().then(mails => {
                this.$emit("clearTrash", mails)
            })
        },

        selected(mail) {
            mail.isSelected = !mail.isSelected
        },
        deleteSelected() {
            const mailsToTrash = this.mails.filter(mail => mail.isSelected)
            this.$emit("deleteSelected", mailsToTrash)
        },
        markSelected() {
            const mailsToRead = this.mails.filter(mail => mail.isSelected)
            this.$emit("markReadSelected", mailsToRead)
        }
    },
    computed: {
        mailToShow() {
            if (!this.mails) return []
            return mailService.filterByActiveList(this.activeList, this.mails)
        }
    },

}


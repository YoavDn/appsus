import mailList from '../cmps/mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import mailDetails from './mail-details.cmp.js'

import { mailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/eventBus-service.js'


export default {
    template: `
    <section class="mail-container flex">
        <mail-side-bar  @openNewMail="newMail" :mails="mails"/>
        <router-view :mails='mails'
        @trashed="movedToTrash" 
        @deleteSelected="deleteSelected" 
        @clearTrash="clearTrash"
        @markReadSelected="markReadSelected"/>
        <new-mail @send="sentMail" @close="closeNewMail" v-if="isNewMail"/>
    </section>
    `,
    components: {
        mailList,
        mailDetails,
        mailSideBar,
        newMail,
    },

    data() {
        return {
            mails: null,
            isNewMail: false,
            selectedMail: null,
            mobile: null,
            sideBarOpen: false
        }
    },
    created() {
        mailService.query().then(mails => {
            this.mails = mails
            this.$router.push('/mail/mails')
        })
    },
    methods: {
        newMail() {
            this.isNewMail = true
        },
        closeNewMail() {
            this.isNewMail = false
        },
        sentMail(mail) {
            this.isNewMail = false
            mailService.addMail(mail).then(() => {
                this.mails.unshift(mail)
            })
        },
        movedToTrash(mail) {
            const idx = this.mails.findIndex(m => m.id === mail.id)
            this.mails[idx].trash = true
            mailService.updateMail(this.mails[idx])
        },
        deleteSelected(selectedMails) {
            selectedMails.forEach(mail => {
                console.log(mail);
                this.movedToTrash(mail)
            })
        },
        markReadSelected(selectedMail) {
            selectedMail.forEach(mail => {
                const idx = this.mails.findIndex(m => m.id === mail.id)
                console.log(mail, idx);
                this.mails[idx].isRead = true
                mailService.updateMail(this.mails[idx])
            })
            const checkboxes = document.querySelectorAll('input[type="checkbox"]')
            checkboxes.forEach(checkbox => checkbox.checked = false)
        },
        clearTrash(mails) {
            console.log(mails);
            this.mails = mails
        }
    },
    computed: {},
}

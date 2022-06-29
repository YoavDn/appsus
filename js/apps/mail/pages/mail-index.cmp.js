import mailList from '../cmps/mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'

import { mailService } from '../services/mail.service.js'


export default {
    template: `
    <section class="mail-container flex">
        <mail-side-bar @openNewMail="newMail" :mails="mails"/>
        <mail-list  :mails="mails"/>
        <new-mail @send="sentMail" @close="closeNewMail" v-if="isNewMail"/>
    </section>
    
    `,
    components: {
        mailList,
        mailSideBar,
        newMail,
    },

    data() {
        return {
            mails: null,
            isNewMail: false,
        }
    },
    created() {
        mailService.query().then(mails => this.mails = mails)
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
            mailService.addMail(mail).then(mails => this.mails = mails)
        }
    },
    computed: {
    },

}


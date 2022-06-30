import mailList from '../cmps/mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import mailDetails from './mail-details.cmp.js'

import { mailService } from '../services/mail.service.js'


export default {
    template: `
    <section class="mail-container flex">
        <mail-side-bar @openNewMail="newMail" :mails="mails"/>
        <!-- <mail-list v-if="!selectedMail" :mails="mails" @selectMail="selected"/> -->
        <router-view  />
        <!-- <mail-Details v-if="selectedMail" :mail="selectedMail" /> -->
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

        }
    },
    created() {
        mailService.query().then(mails => {
            this.$router.push('/mail/mails')
            this.mails = mails
        })

        console.log(this.$router);
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
                this.mails.push(mail)
            })
        },
        selected(mail) {
            this.selectedMail = mail
        }
    },
    computed: {
    },

}


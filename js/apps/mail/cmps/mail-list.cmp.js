import { mailService } from '../services/mail.service.js'
import mailPreview from './mail-preview.cmp.js'



export default {
    // props: ['mails'],
    template: `
        <section  class="mail-list">
            <div v-for="mail in mails" class="mail-item flex align-center" :class="{read: !mail.isRead}" @click="selectMail(mail)" >
                <mail-preview :mail="mail"/>
            </div>
        </section>  
    `,
    components: {
        mailPreview
    },

    data() {
        return {
            mails: null
        }
    },
    created() {
        mailService.query().then(mails => this.mails = mails)
    },
    methods: {
        selectMail(mail) {
            mail.isRead = true
            mailService.updateMail(mail)
            this.$router.push(`/mail/${mail.id}`)
        }
    },
    computed: {

    },
}
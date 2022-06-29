import mailList from '../cmps/mail-list.cmp.js'
import mailSideBar from '../cmps/mail-side-bar.cmp.js'
import { mailService } from '../services/mail.service.js'


export default {
    template: `
    <section class="mail-container flex">
        <mail-side-bar :mails="mails"/>
        <mail-list :mails="mails"/>
    </section>
    
    `,
    components: {
        mailList,
        mailSideBar,
    },

    data() {
        return {
            mails: null,
        }
    },
    created() {
        mailService.query().then(mails => this.mails = mails)
    },
    methods: {
    },
    computed: {
    },
}


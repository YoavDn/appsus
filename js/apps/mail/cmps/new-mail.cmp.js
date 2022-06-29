import { utilService } from '../../../services/util-service.js'

export default {
    template: `
    <section class="new-mail-window shadow">
        <div class="window-bar flex space-between">
            <h2>New Message</h2>
            <div class="new-mail-actions flex align-center">
                <button class="full-screen-btn">f</button>
                <button @click="$emit('close')" class="close-new-mail-btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
        <form class="new-mail-form flex-column">
                <input v-model="newMail.to" type="mail" placeholder="To">                
                <input v-model="newMail.subject" type="text" placeholder="Subject">
                <textarea  v-model="newMail.body" rows="17"></textarea>
                <div class="form-action-bar flex space-between">
                    <button class="new-mail-send-btn">Send</button>
                    <button>More features</button>
                    <button>More features</button>
                </div>
        </form>
    </section>
    `,
    data() {
        return {
            newMail: {
                to: '',
                from: 'user@example.com',
                subject: '',
                body: '',
                id: utilService.makeId(),
            }
        }
    },
    methods: {
    },
    computed: {
    },
}
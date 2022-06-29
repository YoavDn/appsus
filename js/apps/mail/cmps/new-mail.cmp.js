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
        <form @submit.prevent="$emit('send', newMail)" class="new-mail-form flex-column">
                <input v-model="newMail.to" type="email" placeholder="To" required>                
                <input v-model="newMail.subject" type="text" placeholder="Subject" required>
                <textarea  v-model="newMail.body" rows="17"></textarea>
                <div class="form-action-bar flex space-between">
                    <button type="submit" class="new-mail-send-btn">Send</button>
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
                sent: true,
            }
        }
    },
    methods: {
    },
    computed: {
    },
}

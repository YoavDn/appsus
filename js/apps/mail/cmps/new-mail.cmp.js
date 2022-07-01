import { utilService } from '../../../services/util-service.js'

export default {
    template: `
    <section :class="windowStyle" class="new-mail-window shadow">
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
                <textarea class="new-mail-txt-body" v-model="newMail.body" rows="17"></textarea>
                <div class="form-action-bar flex space-between">
                    <button type="submit" class="new-mail-send-btn">Send</button>
                </div>
        </form>
    </section>
    `,
    data() {
        return {
            newMail: {
                to: '',
                from: '',
                subject: '',
                body: '',
                sent: true,
                isRead: true,
                isSelected: false,
            },
            mobile: false,
        }
    },
    methods: {
    },
    computed: {
        windowStyle() {
            return { mobileWindow: this.mobile }
        },
    },
    mounted() {
        if (document.body.clientWidth < 750) this.mobile = true

    },
}

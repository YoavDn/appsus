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
        <form class="new-mail-form">
            <input type="mail">
            <input type="text">
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
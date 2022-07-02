import { eventBus } from '../../../services/eventBus-service.js';
import { utilService } from '../../../services/util-service.js'

export default {
    props: ['noteDraft'],
    emits: ['send', 'close', 'openNewMail'],
    template: `
    <section :class="windowStyle" class="new-mail-window shadow">
        <div class="window-bar flex space-between">
            <h2>New Message</h2>
            <div class="new-mail-actions flex align-center">
                <button v-if="!mobile" @click="enterFullScreen" class="full-screen-btn"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
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
    <div v-if="fullScreen" :style="{'z-index': 300}" class="overlay"></div>
    `,
    data() {
        return {
            newMail: {
                to: '',
                from: 'Me:',
                subject: this.noteDraft ? this.noteDraft.info.title : '',
                body: this.noteDraft ? this.noteDraft.info.txt : '',
                sent: true,
                isRead: true,
                isSelected: false,
            },
            mobile: false,
            fullScreen: false,
        }
    },
    methods: {
        enterFullScreen() {
            this.fullScreen = !this.fullScreen;
        },
    },
    computed: {
        windowStyle() {
            return { 'full-screen': this.fullScreen }
        },
    },
    mounted() {
        if (document.body.clientWidth < 750) this.mobile = true
    },
}

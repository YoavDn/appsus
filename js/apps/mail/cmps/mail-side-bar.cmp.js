export default {
    props: ['mails'],
    template: `
    <section class="mail-side-bar">
        <button class="compose-btn shadow" @click="$emit('openNewMail')"> <span>&plus;</span> Compose</button>
        <div class="side-bar-items">
            <button class="side-bar-btn bold"><span>D</span>Inbox</button>
            <button class="side-bar-btn"><span>&bigstar;</span>Starred</button>
            <button class="side-bar-btn"><span>D</span>Sent</button>
            <button class="side-bar-btn"><span>D</span>Drafts</button>
        </div>
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
    },
}
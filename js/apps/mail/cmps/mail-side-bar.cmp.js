export default {
    props: ['mails'],
    template: `
    <section class="mail-side-bar">
        <button class="compose-btn shadow" @click="$emit('openNewMail')"> <span>&plus;</span> Compose</button>
        <div class="side-bar-items">
            <button class="side-bar-btn bold"><span><i class="fa-solid fa-inbox"></i></span>Inbox</button>
            <button class="side-bar-btn"><span>&bigstar;</span>Starred</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-paper-plane"></i></span>Sent</button>
            <button class="side-bar-btn"><span><i class="fa-solid fa-file"></i></span>Drafts</button>
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
export default {
    props: ['mails'],
    template: `
    <section class="mail-side-bar">
        <button class="compose-btn shadow" @click="$emit('openNewMail')"> <span>&plus;</span> Compose</button>
        <div class="side-bar-items">
            <h2>will add links</h2>
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
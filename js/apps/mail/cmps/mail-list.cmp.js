import mailPreview from './mail-preview.cmp.js'


export default {
    props: ['mails'],
    template: `
        <section  class="mail-list">
            <div v-for="mail in mails" class="mail-item flex align-center" @click="$emit('selectMail',mail)" >
                <mail-preview :mail="mail"/>
            </div>
        </section>  
    `,
    components: {
        mailPreview
    },

    data() {
        return {

        }
    },
    created() {


    },
    methods: {
    },
    computed: {
    },
}
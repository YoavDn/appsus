import noteText from "../cmps/note-text.cmp.js"

export default {
    template: `
    <h2>keep</h2>
    <note-text v-if="isNoteTextShown"/>
    <button><i class="fa-regular fa-comment"></i></button>
    
    `,
    components: {
        noteText
    },
    data() {
        return {
            isNoteTextShown: true,
        }
    },
    methods: {
    },
    computed: {
    },
}
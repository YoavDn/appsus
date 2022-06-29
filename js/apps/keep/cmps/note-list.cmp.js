import notePreview from "./note-preview.cmp.js"

export default {
    props: ["notes"],
    template: `
    <section class="notes-list">
        <ul>
            <li v-for="note in notes" :key="note.id" class="note-preview-contianer">
                <note-preview :note="note"/>
            </li>
        </ul>
    </section>
    `,
    components:{
        notePreview
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
}
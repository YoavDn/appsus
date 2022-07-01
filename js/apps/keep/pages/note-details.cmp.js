import { notesService } from "../keep-services/note.service.js"
import notePreview from "../cmps/note-preview.cmp.js"

export default {
    template: `
    <h1>hello</h1>
        <section class="note-detail">
            <div class="single-preview"  :style="{backgroundColor: note.style.backgroundColor}">
                <note-preview :note="note"/>
            </div>
        </section>
    `,
    components: {
        notePreview,
    },
    data() {
        return {
            note: null
        }
    },
    created(){
        const id = this.$route.params.keepId
        notesService.get(id)
        .then((res) => {
            this.note = res
        })

    },
    methods: {
    },
    computed: {
    },
}
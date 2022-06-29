import noteText from "../cmps/note-text.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import noteList from "../cmps/note-list.cmp.js"

export default {
    template: `
    <h2>keep</h2>
    <section class="keep-app-container">
        <div class="input-container">
            <note-text v-if="isNoteTextShown"/>
            <button><i class="fa-regular fa-comment"></i></button>
        </div>
        <section class="notes-list-container">
            <note-list :notes="notes"/>
        </section>
    </section>
    
    `,
    components: {
        noteText,
        noteList,
    },
    data() {
        return {
            isNoteTextShown: true,
            notes: null,
        }
    },
    created(){
        notesService.query()
        .then(res => {
            this.notes = res
            console.log('this.notes = ', this.notes)
        })
    },
    methods: {
    },
    computed: {
    },
}
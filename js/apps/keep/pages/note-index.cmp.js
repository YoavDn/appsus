import noteText from "../cmps/note-text.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import noteList from "../cmps/note-list.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"

export default {
    template: `
    <section class="keep-app-container">
        <div class="input-container">
            <note-text v-if="isNoteText"/>
            <note-img v-if="isNoteImg"/>
            <button><i class="fa-regular fa-comment"></i></button>
            <button @click="displayImageInput"><i class="fa-solid fa-image"></i></button>
        </div>
        <section class="notes-list-container">
            <note-list :notes="notes"/>
        </section>
    </section>
    
    `,
    components: {
        noteList,
        noteText,
        noteImg,
    },
    data() {
        return {
            isNoteText: true,
            isNoteImg: false,
            notes: null,
        }
    },
    created() {
        this.updateNotes()
    },
    methods: {
        updateNotes() {
            notesService.query()
                .then(res => {
                    this.notes = res
                    console.log('this.notes = ', this.notes)
                })
        },
        displayImageInput(){
            this.isNoteText = false
            this.isNoteImg = true
        }
    },
    computed: {
    },

}
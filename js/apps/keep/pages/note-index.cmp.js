import noteText from "../cmps/note-text.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import noteList from "../cmps/note-list.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodo from "../cmps/note-todo.cmp.js"

export default {
    template: `
    <section class="keep-app-container">
        <div class="input-container shadow">

            <note-text @noteAdded="addNote" v-if="isNoteText"/>
            <note-img @noteAdded="addNote" v-if="isNoteImg"/>
            <note-video @noteAdded="addNote" v-if="isNoteVideo"/>
            <note-todo @noteAdded="addNote" v-if="isNoteTodo"/>

            <button @click="displayTextInput"  class="note-type-btn"><i class="fa-regular fa-comment"></i></button>
            <button @click="displayImageInput" class="note-type-btn"><i class="fa-solid fa-image"></i></button>
            <button @click="displayVideoInput" class="note-type-btn"><i class="fab fa-youtube"></i></button>
            <button @click="displayToDoInput" class="note-type-btn"><i class="fa fa-list"></i></button>

        </div>
        <section class="notes-list-container">
            <note-list @removeNote="removeNote" @updateNote="updateNote" :notes="notes"/>
        </section>
    </section>
    
    `,
    components: {
        noteList,
        noteText,
        noteImg,
        noteVideo,
        noteTodo
    },
    data() {
        return {
            isNoteText: true,
            isNoteImg: false,
            isNoteVideo: false,
            isNoteTodo: false,
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
                })
        },
        removeNote(noteId){
            notesService.remove(noteId)
            .then(() => {
                const idx = this.notes.findIndex((note) => note.id === noteId)
                this.notes.splice(idx, 1)
            })
        },
        addNote(note){
            notesService.addNote(note)
            .then(() => {
                this.updateNotes()
                this.notes.unshift(note)
                this.displayTextInput()
            })
        },
        updateNote(note){
            notesService.update(note)
            .then(() => {
                console.log('note = ', note)
            })
        },
        displayTextInput() {
            this.isNoteText = true
            this.isNoteVideo = false
            this.isNoteImg = false
            this.isNoteTodo = false
        },
        displayImageInput() {
            this.isNoteText = false
            this.isNoteVideo = false
            this.isNoteImg = true
            this.isNoteTodo = false

        },
        displayVideoInput() {
            this.isNoteText = false
            this.isNoteVideo = true
            this.isNoteTodo = false
            this.isNoteImg = false
        },
        displayToDoInput(){
            this.isNoteText = false
            this.isNoteVideo = false
            this.isNoteImg = false
            this.isNoteTodo = true

        }
    },
    computed: {
    },

}
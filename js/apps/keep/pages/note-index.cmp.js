import noteText from "../cmps/note-text.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import noteList from "../cmps/note-list.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodo from "../cmps/note-todo.cmp.js"
import { storageService } from "../../../services/async-storage-service.js"

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
            <!-- Pinned list -->
            <h3 v-if="pinnedNotes.length" class="pinned-header" >Pinned Notes: </h3>
            <note-list @removeNote="removeNote" @updateNote="updateNote" @unPinNote="unPinNote" :notes="pinnedNotes"/>
            <!-- Regular list -->
            <note-list @removeNote="removeNote" @updateNote="updateNote" @pinNote="pinNote":notes="notes"/>
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
            pinnedNotes: null,
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
            notesService.queryPins()
                .then(res => {
                    this.pinnedNotes = res
                })
        },

        removeNote(noteId) {
            notesService.get(noteId)
                .then(res => {
                    console.log('res = ', res)
                    // console.log('note = ', note)
                    if (res) {
                        notesService.removeFromRegularList(noteId)
                            .then(() => {
                                const idx = this.notes.findIndex((note) => note.id === noteId)
                                console.log('idx = ', idx)
                                this.notes.splice(idx, 1)
                            })
                    } else {
                        notesService.removeFromPinnedList(noteId)
                            .then(() => {

                                const idx = this.pinnedNotes.findIndex((note) => note.id === noteId)
                                this.pinnedNotes.splice(idx, 1)

                            })
                    }
                })

        },

        addNote(note) {
            notesService.addNote(note)
                .then(() => {
                    this.updateNotes()
                    this.notes.unshift(note)
                    this.displayTextInput()
                })
        },

        pinNote(note) {
            const pinnedNote = note
            pinnedNote.isPinned = true
            this.removeNote(note.id)
            notesService.addToPins(pinnedNote)
                .then(() => {

                    this.pinnedNotes.unshift(pinnedNote)
                    this.$router.go()
                })


        },
        unPinNote(note) {
            const newNote = note
            newNote.isPinned = false
            this.addNote(newNote)
            this.removeNote(note.id)

            this.$router.go()
        },

        updateNote(note) {
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
        displayToDoInput() {
            this.isNoteText = false
            this.isNoteVideo = false
            this.isNoteImg = false
            this.isNoteTodo = true

        }
    },
    computed: {
    },

}
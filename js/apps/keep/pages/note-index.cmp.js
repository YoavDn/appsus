import noteText from "../cmps/note-text.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import noteList from "../cmps/note-list.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodo from "../cmps/note-todo.cmp.js"
import { storageService } from "../../../services/async-storage-service.js"
import keepSideBar from "../cmps/keep-side-bar.cmp.js"
import { eventBus } from "../../../services/eventBus-service.js"

export default {
    template: `
    <section class="keep-app-container">
        <keep-side-bar @filter="setFilter"/>
        <section class="main-container">
            <div class="input-container shadow">

                 <note-text @noteAdded="addNote" v-if="isNoteText"/>
                 <note-img @noteAdded="addNote" v-if="isNoteImg"/>
                 <note-video @noteAdded="addNote" v-if="isNoteVideo"/>
                 <note-todo @noteAdded="addNote" v-if="isNoteTodo"/>

                 <div @click="activate" class="btns-container flex">
                    <button @click="displayTextInput"  class="note-type-btn"><i class="fa-regular fa-comment note-type-btn type-active"></i></button>
                    <button @click="displayImageInput" class="note-type-btn "><i class="fa-solid fa-image note-type-btn"></i></button>
                    <button @click="displayVideoInput" class="note-type-btn"><i class="fab fa-youtube note-type-btn"></i></button>
                    <button @click="displayToDoInput" class="note-type-btn"><i class="fa fa-list note-type-btn"></i></button>
                 </div>

            </div>
            <section class="notes-list-container">
                <!-- Pinned list -->
                <h3 v-if="pinnedNotes" class="pinned-header" >Pinned Notes: </h3>
                <note-list @removeNote="removeNote" @updateNote="updateNote" @unPinNote="unPinNote" :notes="pinnedNotes"/>
                <!-- Regular list -->
                <note-list @removeNote="removeNote" @updateNote="updateNote" @pinNote="pinNote" :notes="notesToDisplay"/>
            </section>
        </section>
       
    </section>
    
    `,
    components: {
        noteList,
        noteText,
        noteImg,
        noteVideo,
        noteTodo,
        keepSideBar
    },
    data() {
        return {
            isNoteText: true,
            isNoteImg: false,
            isNoteVideo: false,
            isNoteTodo: false,
            notes: null,
            pinnedNotes: null,
            filterBy: null,
        }
    },
    created() {
        this.updateNotes()
        eventBus.on('updateNote', this.updateNote)
    },
    methods: {
        updateNotes() {
            notesService.query()
                .then(res => {
                    if (!res || !res.length) {
                        res = {}
                    }
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
                    if (res) {
                        notesService.removeFromRegularList(noteId)
                            .then(() => {
                                const idx = this.notes.findIndex((note) => note.id === noteId)
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

                })


        },
        unPinNote(note) {
            const newNote = note
            newNote.isPinned = false
            this.addNote(newNote)
            this.removeNote(note.id)

        },

        updateNote(note) {
            notesService.update(note)
                .then(() => {
                })
        },

        setFilter(type){
            this.filterBy = type
        },

        activate(e) {
            if (!e.target.classList.contains('note-type-btn')) return
            document.querySelectorAll('.note-type-btn').forEach(el => el.classList.remove('type-active'))
            e.target.classList.add('type-active');

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
        notesToDisplay(){
            if (!this.filterBy) return this.notes
            return this.notes.filter((note) => note.type === this.filterBy)
        },
    },

}
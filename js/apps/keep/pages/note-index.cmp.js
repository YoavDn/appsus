import noteText from "../cmps/note-text.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import noteList from "../cmps/note-list.cmp.js"
import noteImg from "../cmps/note-img.cmp.js"
import noteVideo from "../cmps/note-video.cmp.js"
import noteTodo from "../cmps/note-todo.cmp.js"
import noteAudio from "../cmps/note-audio.cmp.js"
import { storageService } from "../../../services/async-storage-service.js"
import keepSideBar from "../cmps/keep-side-bar.cmp.js"
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    template: `
    <section class="keep-app-container">
        <keep-side-bar @filter="setFilter"/>
        <section class="main-container">
            <div class="input-container shadow">

                 <note-text @noteAdded="addNote" v-if="noteType === 'type-text'"/>
                 <note-img @noteAdded="addNote" v-if="noteType === 'type-img'"/>
                 <note-video @noteAdded="addNote" v-if="noteType === 'type-video'"/>
                 <note-todo @noteAdded="addNote" v-if="noteType === 'type-todos'"/>
                 <note-audio @noteAdded="addNote" v-if="noteType === 'type-audio'"/>

                 <div @click="activate" class="btns-container flex">
                    <button @click="setType('type-text')"  class="note-type-btn"><i class="fa-regular fa-comment note-type-btn type-active"></i></button>
                    <button @click="setType('type-img')" class="note-type-btn "><i class="fa-solid fa-image note-type-btn"></i></button>
                    <button @click="setType('type-video')" class="note-type-btn"><i class="fab fa-youtube note-type-btn"></i></button>
                    <button @click="setType('type-todos')" class="note-type-btn"><i class="fa fa-list note-type-btn"></i></button>
                    <button @click="setType('type-audio')" class="note-type-btn"><i class="fa-solid fa-microphone"></i></button>
                 </div>

            </div>
            <section class="notes-list-container">
                <!-- Pinned list -->
                <h3 v-if="pinnedNotes" class="pinned-header" >Pinned Notes: </h3>
                <note-list @removeNote="removeNote" @updateNote="updateNote" @unPinNote="unPinNote" :notes="pinnedNotes"/>
                <!-- Regular list -->
                <note-list @removeNote="removeNote" @updateNote="updateNote" @pinNote="pinNote" @duplicateNote="addNote" :notes="notesToDisplay"/>
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
        noteAudio,
        keepSideBar
    },
    data() {
        return {
            unsubscribe: null,
            noteType: 'type-text',
            notes: null,
            pinnedNotes: null,
            filterBy: null,
        }
    },
    created() {
        this.updateNotes()
        eventBus.on('updateNote', this.updateNote)
        this.unsubscribe = eventBus.on('saveMailToNote', this.saveMailToNote)
    },
    unmounted() {
        this.unsubscribe()
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

        saveMailToNote(mail) {
            console.log(mail);
            const newNote = {
                type: "note-text",
                isPinned: false,
                info: {
                    title: `${mail.subject} sent by ${mail.from}`,
                    txt: mail.body,
                },
                style: {
                    backgroundColor: '#fff',
                    color: '#000',
                },
            }

            this.addNote(newNote)
        },

        addNote(note) {
            notesService.addNote(note)
                .then(() => {
                    this.updateNotes()
                    this.notes.unshift(note)
                    this.setType('type-text')
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

        setFilter(type) {
            this.filterBy = type
        },

        activate(e) {
            if (!e.target.classList.contains('note-type-btn')) return
            document.querySelectorAll('.note-type-btn').forEach(el => el.classList.remove('type-active'))
            e.target.classList.add('type-active');

        },
        setType(type) {
            this.noteType = type
        }

    },
    computed: {
        notesToDisplay() {
            if (!this.filterBy) return this.notes
            return this.notes.filter((note) => note.type === this.filterBy)
        },
    },


}
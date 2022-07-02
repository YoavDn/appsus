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
<!-- Notes cmps -->
                 <note-text @noteAdded="addNote" v-if="noteType === 'type-text'"/>
                 <note-img @noteAdded="addNote" v-if="noteType === 'type-img'"/>
                 <note-video @noteAdded="addNote" v-if="noteType === 'type-video'"/>
                 <note-todo @noteAdded="addNote" v-if="noteType === 'type-todos'"/>
                 <note-audio @noteAdded="addNote" v-if="noteType === 'type-audio'"/>

<!-- Buttons to set the type of the note -->
                 <div @click="activate" class="btns-container flex">
                    <button @click="setType('type-text')"  class="note-type-btn" data-title="Text"><i class="fa-regular fa-comment note-type-btn type-active"></i></button>
                    <button @click="setType('type-img')" class="note-type-btn" data-title="Image"><i class="fa-solid fa-image note-type-btn"></i></button>
                    <button @click="setType('type-video')" class="note-type-btn" data-title="Video"><i class="fab fa-youtube note-type-btn"></i></button>
                    <button @click="setType('type-audio')" class="note-type-btn" data-title="Record"><i class="fa-solid fa-microphone note-type-btn"></i></button>
                    <button @click="setType('type-todos')" class="note-type-btn" data-title="Todos"><i class="fa fa-list note-type-btn"></i></button>
                 </div>

            </div>
            <section class="notes-list-container">
                <!-- Pinned Notes list -->
                <h3 v-if="pinnedNotes" class="pinned-header" >Pinned Notes: </h3>
                <note-list @removeNote="removeNote"  @updateNote="updateNote" @unPinNote="unPinNote" @sendNoteToMail="sendNoteToMail" :notes="pinnedNotes"/>
                <!-- Regular Notes list -->
                <note-list @removeNote="removeNote" @updateNote="updateNote" @pinNote="pinNote" @duplicateNote="addNote" @sendNoteToMail="sendNoteToMail" :notes="notesToDisplay"/>
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
    // Func to query the notes on created or when called
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
// Remove note function that works with pinned notes list and regular list
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
// Load from email integration using event bus
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
// Send note to mail
        sendNoteToMail(note) {
            this.$router.push('/mail/mails')
            setTimeout(() => eventBus.emit('note-to-mail', note), 1000)
        },

// Add note function
        addNote(note) {
            notesService.addNote(note)
                .then(() => {
                    this.updateNotes()
                    this.notes.unshift(note)
                    // this.setType('type-text')
                })
        },

//  Pin note / add to pinned notes list
        pinNote(note) {
            const pinnedNote = note
            pinnedNote.isPinned = true
            this.removeNote(note.id)
            notesService.addToPins(pinnedNote)
                .then(() => {
                    this.pinnedNotes.unshift(pinnedNote)
                })


        },

// Unpin note / remove from pinned notes list
        unPinNote(note) {
            const newNote = note
            newNote.isPinned = false
            this.addNote(newNote)
            this.removeNote(note.id)

        },

// Update notes using notesService
        updateNote(note) {
            notesService.update(note)
                .then(() => {
                })
        },

// Change the filter called in the side bar cmp
        setFilter(type) {
            this.filterBy = type
        },

// Mark the current note type in the note buttons in the top of the document
        activate(e) {
            if (!e.target.classList.contains('note-type-btn')) return
            document.querySelectorAll('.note-type-btn').forEach(el => el.classList.remove('type-active'))
            e.target.classList.add('type-active');

        },

// Change the type of the note
        setType(type) {
            this.noteType = type
        }

    },


    computed: {

// Listens to the filter element in the data, and changes accordingly
        notesToDisplay() {
            if (!this.filterBy) return this.notes
            return this.notes.filter((note) => note.type === this.filterBy)
        },
    },


}
import notePreview from "./note-preview.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import { storageService } from "../../../services/async-storage-service.js"

export default {
    emits: ["removeNote","updateNote","pinNote","unPinNote"],
    props: ["notes"],
    template: `
    <section class="notes-list">
        
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container" :style="{backgroundColor: note.style.backgroundColor, color: note.style.color}" @click="selectNote">
                
                <note-preview :note="note" />
                <div class="edit-btns-container" >
                    
                    <button class="edit-btn" @click.stop :style="{color: note.style.color}">
                        <input :id="'note'+ note.id"  type="color" class="input-color" @input="changeBackgroundColor($event, note)">
                        <label :for="'note'+ note.id" data-title="Change color"><i class="fas fa-palette"></i></label>
                    </button>

                    <button class="edit-btn" @click.stop="removeNote(note)" data-title="Remove" :style="{color: note.style.color}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>

                    <button v-if="note.type !== 'note-todos'" class="edit-btn" data-title="Edit" @click.stop="editNote(note)" :style="{color: note.style.color}">
                        <i v-if="!note.isEditAble" class="fa-solid fa-pen-to-square"></i>
                        <i v-if="note.isEditAble" class="fa-solid fa-circle-check"></i>
                    </button>
                    
                    <button class="edit-btn" @click.stop :style="{color: note.style.color}">
                        <input :id="'fontcolor '+ note.id"  type="color" class="input-color" @input="changeFontColor($event, note)" :style="{color: note.style.color}">
                        <label :for="'fontcolor '+ note.id" class="font-color-btn">A</label>
                    </button>

                    <button class="edit-btn" :class="{pinned: note.isPinned}" data-title="Pin" @click.stop="pin(note)" :style="{color: note.style.color}">
                        <i class="fa-solid fa-thumbtack"></i>
                    </button>
                </div>
            </li>
        </ul>
    </section>

    <div v-if="isNoteSelected" class="selected-note overlay" @click="closeSelected"><span v-if="isNoteSelected">X</span></div>
    `,
    components: {
        notePreview,
    },

    data() {
        return {
            isNoteSelected: false,
            noteContainer: null,
        }
    },
    methods: {
        changeBackgroundColor(ev, note) {
            const newColor = ev.target.value
            note.style.backgroundColor = newColor

            notesService.update(note)
        },
        changeFontColor(ev, note) {
            const newColor = ev.target.value
            note.style.color = newColor

            notesService.update(note)
        },

        removeNote(note) {
            // notesService.remove(note.id)
            this.$emit('removeNote', note.id)
        },
        editNote(note) {
            note.isEditAble = !note.isEditAble
            let title = document.querySelector(".note-title" + note.id).innerText
            let txt = document.querySelector(".note-txt" + note.id).innerText
            note.info.title = title
            note.info.txt = txt
            this.$emit('updateNote', note)
        },
        pin(note) {
            if (this.isNoteSelected) this.closeSelected()
            if (note.isPinned) {
                this.unpin(note)
            }
            this.$emit('pinNote', note)
        },
        unpin(note) {
            if (this.isNoteSelected) this.closeSelected()
            this.$emit('unPinNote', note)
        },
        selectNote(e) {
            this.isNoteSelected = true
            this.noteContainer = e.target.closest('li')
            this.noteContainer.classList.add("focused")
        },
        closeSelected() {
            this.isNoteSelected = false
            this.noteContainer.classList.remove("focused")
        }

    },
    computed: {
    },
}
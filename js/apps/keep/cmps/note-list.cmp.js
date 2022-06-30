import notePreview from "./note-preview.cmp.js"
import { notesService } from "../keep-services/note.service.js"
import { storageService } from "../../../services/async-storage-service.js"

export default {
    props: ["notes"],
    template: `
    <section class="notes-list">
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-contianer" :style="{backgroundColor: note.style.backgroundColor}">
                <note-preview :note="note"/>
                <div class="edit-btns-container">
                    
                    <button class="edit-btn">
                        <input :id="'note'+idx"  type="color" class="input-color" @input="changeBackgroundColor($event, note)">
                        <label :for="'note'+idx" data-title="Change color"><i class="fas fa-palette"></i></label>
                    </button>
                    <button class="edit-btn" @click="removeNote(note)" data-title="Remove"><i class="fa-solid fa-trash-can"></i></button>

                    <button class="edit-btn" data-title="Edit" @click="editNote(note)">
                        <i v-if="!note.isEditAble" class="fa-solid fa-pen-to-square"></i>
                        <i v-if="note.isEditAble" class="fa-solid fa-circle-check"></i>
                    </button>

                    <button class="edit-btn" :class="{pinned: note.isPinned}" data-title="Pin" @click="pin(note)"><i class="fa-solid fa-thumbtack"></i></button>
                </div>
            </li>
        </ul>
    </section>
    `,
    components:{
        notePreview
    },
    data() {
        return {
            data: {
            }
        }
    },
    methods: {
        changeBackgroundColor(ev, note){
            console.log('note = ', note)
            const newColor = ev.target.value
            note.style.backgroundColor = newColor

            notesService.update(note)
        },
        removeNote(note){
            // notesService.remove(note.id)
            this.$emit('removeNote', note.id)
        },
        editNote(note) {
            note.isEditAble = !note.isEditAble
            let title = document.querySelector(".note-title" + note.id).innerText
            let txt = document.querySelector(".note-txt" + note.id).innerText
            note.info.title = title
            note.info.txt = txt
            console.log('note.id = ', title)
            this.$emit('updateNote', note)
        },
        pin(note){
            if (note.isPinned){
                this.unpin(note)
            }
            this.$emit('pinNote', note)
        },
        unpin(note){
            this.$emit('unPinNote', note)
        }

    },
    computed: {
    },
}
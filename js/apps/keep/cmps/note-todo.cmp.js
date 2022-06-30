import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container">
            <input v-if="isExpand" type="text" placeholder="Title" class="title-input" v-model="note.info.title">
            <div class="text_area" contentEditable="true" @click="isExpand = true">
                <ul >
                    <li v-if="!isDone"  class="input-list">
                        Damn you...
                    </li>
                </ul>
            </div>
            <button @click="onAddNote" class="add-note-btn">Add note</button>
        </div>
    `,
    data() {
        return {
            isExpand: false,
            isDone: false,
            note: {
                type: 'type-todos',
                isPinned: false,
                info: {
                    title: '',
                    todos: []
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
        }
    },
    methods: {
        onAddNote(ev) {

            // if (!this.note.info.todos || !this.note.info.todos.length) return
            
            let string = ev.target.parentElement.innerText.split("\n")
            if (!string || !string.length) return
            console.log('string = ', string)
            for (let i = 0; i < string.length - 1; i++) {
                let todo = {
                    txt: string[i],
                    done: null
                }
                this.note.info.todos.push(todo)
                // this.isDone = true
                
            }
            this.$emit('noteAdded', this.note)


        },

    },
    computed: {
    },
}
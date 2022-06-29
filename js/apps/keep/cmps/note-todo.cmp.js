import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container">
            <input v-if="isExpand" type="text" placeholder="Title" class="title-input" v-model="note.info.title">
            <div class="text_area" contentEditable="true" @click="isExpand = true">
                <ul >
                    <li v-if="!isDone" v-for="todo in note.info.todos" class="input-list">
                        {{todo.txt}}
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
                    todos: [
                        { txt: "Driving license", done: null },
                        { txt: "Pick the kids", done: null }
                    ]
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
        }
    },
    methods: {
        onAddNote(ev) {

            if (!this.note.info.todos || !this.note.info.todos.length) return
            this.note.info.todos = []
            let string = ev.target.parentElement.innerText.split("\n")
            console.log('string = ', string)
            for (let i = 0; i < string.length - 1; i++) {
                let todo = {
                    txt: string[i],
                    done: null
                }
                this.note.info.todos.push(todo)
                this.isDone = true

            }

            notesService.addNote(this.note)
            this.$router.go()


        },

    },
    computed: {
    },
}
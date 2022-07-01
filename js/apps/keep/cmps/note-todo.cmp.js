import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container">
            <input type="text" placeholder="Enter todo title first" class="title-input" v-model="note.info.title">

            <button @click="onAddNote" class="add-note-btn">Add todo</button>
        </div>
    `,
    data() {
        return {
            isExpand: false,
            isDone: false,
            note: {
                type: 'note-todos',
                isPinned: false,
                info: {
                    title: '',
                    todos: [
                        {txt:'Go to supermarket', isDone: false},
                        {txt:'Go to gym', isDone: false},
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

            // if (!this.note.info.todos || !this.note.info.todos.length) return
            
            // let string = ev.target.parentElement.innerText.split("\n")
            // if (!string || !string.length) return
            // console.log('string = ', string)
            // for (let i = 0; i < string.length - 1; i++) {
            //     let todo = {
            //         txt: string[i],
            //         done: null
            //     }
            //     this.note.info.todos.push(todo)
            //     // this.isDone = true
                
            // }
            this.$emit('noteAdded', this.note)


        },

    },
    computed: {
    },
}
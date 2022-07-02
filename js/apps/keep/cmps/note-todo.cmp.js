import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container">
            <input type="text" placeholder="Enter todo title first" class="title-input" v-model="note.info.title" >

            <button @click="onAddNote" class="add-note-btn"><i class="fa-solid fa-circle-check"></i> Add note</button>

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
                    // Demo todo on adding 
                    // ** Go to todo-list,cmp.js to see that todo adding function ** 
                    todos: [
                        {txt:'Go to supermarket', isDone: false},
                        {txt:'Go to gym', isDone: false},
                    ]
                },
                style: {
                    backgroundColor: '#fff',
                    color: "#000"
                }
            }
        }
    },
    methods: {
        onAddNote(ev) {
            this.$emit('noteAdded', this.note)
        },

    },
    computed: {
    },
}
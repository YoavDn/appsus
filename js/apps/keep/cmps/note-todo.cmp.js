import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container shadow">
            <input v-if="isExpand" type="text" placeholder="Title" class="title-input" @keyup.enter="addTodo" v-model="note.info.title">
            <div id="text_area" contentEditable="true">
                <ul>
                    <li v-for="todo in todos">

                    </li>
                </ul>
            </div>
        </div>
    `,
    data() {
        return {
            isExpand: false,
            note: {
                type: 'note-text',
                isPinned: false,
                info: {
                    title: '',
                    todos: ['do that', 'dothis']
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
        }
    },
    methods: {
        onAddNote() {

            if (this.note.info.title === '' && this.note.info.txt === '') return
            notesService.addNote(this.note)
            this.$router.go()


        },
        addTodo(){
            this.$el.querySelector(".ol-list").append("<li class='list-item'></li>");
            this.$el.querySelector('.list-item').each(function(i){
            $(this).text('List Item')})
        }
    },
    computed: {
    },
}
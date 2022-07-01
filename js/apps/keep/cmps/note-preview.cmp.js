import { notesService } from "../keep-services/note.service.js"
import todoList from "./todo-list.cmp.js"
export default {
    props: ['note'],
    template: `
        <div v-if="note.type === 'note-text'" class="type-text" :contentEditable="note.isEditAble">
            <h3 :class="'note-title' + note.id">{{note.info.title}}</h3>

            <p :class="'note-txt' + note.id">{{note.info.txt}}</p>
        </div>
        <div v-if="note.type === 'note-img'" class="type-text" :contentEditable="note.isEditAble">
            <img :src=note.info.url alt="">
            <h3 :class="'note-title' + note.id">{{note.info.title}}</h3>
        </div>

        <div v-if="note.type === 'note-video'" class="type-text" :contentEditable="note.isEditAble">
            <h3 :class="'note-title ' + note.id">{{note.info.title}}</h3>
        <iframe class="embededVideo" :src=note.info.url frameborder="0"></iframe>
        </div>

        <div v-if="note.type === 'note-todos'" class="type-todo" :contentEditable="note.isEditAble">
            <h3 :class="'note-title ' + note.id">{{note.info.title}}</h3>
            <!-- <ul>
                <li v-for="todo in note.info.todos">
                    
                    {{todo.txt}}
                </li>
            </ul> -->
            <!-- todo list cmp -->
            <todo-list :note="note"/>
        </div>

    `,
    components: {
        todoList
    },
    data() {
        return {

        }
    },
    methods: {


    },
    computed: {
    },
}
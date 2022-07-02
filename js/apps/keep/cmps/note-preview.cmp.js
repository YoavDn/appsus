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

        <div v-if="note.type === 'note-audio'" class="type-text" :contentEditable="note.isEditAble">
            <h3 :class="'note-title ' + note.id">{{note.info.title}}</h3>
                <audio class="audio-player" ref="audio" controls>
                    <source :src=note.info.src type="audio/webm"/>
                </audio>

                <!-- <audio :id="playerUniqId" :src="audioSource"></audio> -->
        </div>

        <div v-if="note.type === 'note-todos'" class="type-todo" :contentEditable="note.isEditAble">
            <h3 :class="'note-title ' + note.id">{{note.info.title}}</h3>
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
        playSound(sound){
            console.log('sound = ', sound)
        }

    },
    computed: {
    },
}
export default {
    props: ['note'],
    template: `
        <div v-if="note.type === 'note-text'" class="type-text">
            <h3>{{note.info.title}}</h3>
            <p>{{note.info.txt}}</p>
        </div>
        <div v-if="note.type === 'note-img'" class="type-text">
            <img :src=note.info.url alt="">
            <h3>{{note.info.title}}</h3>
        </div>

        <div v-if="note.type === 'note-video'" class="type-text">
            <h3>{{note.info.title}}</h3>
        <iframe class="embededVideo" :src=note.info.url frameborder="0"></iframe>
        </div>

        <div v-if="note.type === 'type-todos'" class="type-todo">
            <h3>{{note.info.title}}</h3>
            <ul>
                <li v-for="todo in note.info.todos">
                    
                    {{todo.txt}}
                </li>
            </ul>
        </div>
        <div class="edit-btns-container">
            <button class="edit-btn"><i class="fas fa-palette"></i></button>
            <button class="edit-btn"><i class="fa-solid fa-trash-can"></i></button>
            <button class="edit-btn"><i class="fa-solid fa-thumbtack"></i></button>
            <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
}
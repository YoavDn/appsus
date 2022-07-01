import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props:['note'],
    template: `
        <div class="todo-conatiner flex" @click.stop>
            <input type="text" name="" id="todo-input" v-model="todoTxt">
            <button class="edit-btn plus" @click="addTodo"><i class="fa-solid fa-plus"></i></button>
        </div>

        <div class="todo-list-container">
            <ul>
                <li v-for="todo in note.info.todos" @click.stop>
                    <span class="todo-txt" :class="{done: todo.isDone}" @click.stop="endTodo(todo)">{{todo.txt}}</span>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            todoTxt: '',
        }
    },
    create(){
        
    },
    methods: {
        addTodo(){
            if (this.todoTxt === '') return
            const newTodo = {txt: this.todoTxt, isDone: false}
            this.note.info.todos.push(newTodo)
            this.todoTxt = ''
            eventBus.emit('updateNote', this.note)
        },
        endTodo(todo){
            (!todo.isDone) ? todo.isDone = true : todo.isDone = false
            eventBus.emit('updateNote', this.note)
            console.log('todo = ', todo)
        }
    },
    computed: {
    },
}
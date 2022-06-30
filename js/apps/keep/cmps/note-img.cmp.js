import { notesService } from "../keep-services/note.service.js"

export default {
    template: `
    <div class="txt-container">
    <input v-if="isExpand" type="text" placeholder="Title" class="title-input"
             @keyup.enter="onAddNote" v-model="note.info.title">

        <input type="text" @click="isExpand = true" class="txt-input" v-model="note.info.url" placeholder="Enter image url..">
        <button @click="onAddNote" class="add-note-btn">Add note</button>
    </div>
    `,
    data() {
        return {
            isExpand: false,
            note: {
                type: 'note-img',
                isPinned: false,
                info: {
                    url: '',
                    title: ''
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
        }
    },
    methods: {
        onAddNote() {

            if (this.note.info.url === '') return
            this.$emit('noteAdded', this.note)
            // console.log('this.note = ', this.note)
            // this.$router.go()


        },
    },
    computed: {
    },
}
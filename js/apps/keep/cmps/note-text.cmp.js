import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container">
        <input v-if="isExpand" type="text" placeholder="Title" class="title-input" @keyup.enter="onAddNote" v-model="inTitle">
        <input type="text" placeholder="Whats on your mind..."
         class="txt-input" @click="isExpand = true" @keyup.enter="onAddNote" v-model="inText">
         <button @click="onAddNote" class="add-note-btn">Add note</button>
        </div>
    `,
    data() {
        return {
            isExpand: false,
            inTitle:'',
            inText: '',
            note: {
                type: 'note-text',
                isPinned: false,
                info: {
                    title: '',
                    txt: ''
                },
                style: {
                    backgroundColor: '#fff'
                }
            }
        }
    },
    methods: {
        onAddNote() {
            if (this.inText === '' && this.inText === '') return
            this.note.info.title = this.inTitle
            this.note.info.txt = this.inText
            this.$emit('noteAdded', this.note)

            this.inText = ''
            this.inTitle = ''
            this.isExpand = false
        },


    },
    computed: {
    },
}
import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container">
            <input v-if="isExpand" type="text" placeholder="Title" class="title-input" @keyup.enter="onAddNote" v-model="inTitle">
            <input type="text" placeholder="Whats on your mind..."
                class="txt-input" @click="isExpand = true" @keyup.enter="onAddNote" v-model="inText">
            <button v-if="isExpand" @click="onAddNote" class="add-note-btn">
                
                <i class="fa-solid fa-circle-check"></i> 
                Add note
            </button>
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
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }
        }
    },
    methods: {
        onAddNote() {
            if (this.inTitle === '' && this.inText === '') return
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
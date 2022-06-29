import { notesService } from "../keep-services/note.service.js"
export default {
    template: `
        <div class="txt-container shadow">
        <input v-if="isExpand" type="text" placeholder="Title" class="title-input" @keyup.enter="onAddNote" v-model="note.info.title">
        <input type="text" placeholder="Whats on your mind..."
         class="txt-input" @click="isExpand = true" @keyup.enter="onAddNote" v-model="note.info.txt">
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
            // console.log('txt = ', this.note.txt)
            // console.log('this.title = ', this.note.title)
            // console.log('note = ', this.note)
            if (this.note.info.title === '' && this.note.info.txt === '') return
            notesService.addNote(this.note)
            this.$router.go()


        },
        expand() {

        }

    },
    computed: {
    },
}
import { notesService } from "../keep-services/note.service.js"

export default {
    template: `
    <div class="txt-container shadow">
    <input v-if="isExpand" type="text" placeholder="Title" class="title-input"
             @keyup.enter="onAddNote" v-model="note.info.title">

        <input type="text" @click="isExpand = true" class="txt-input" v-model="note.info.url" placeholder="Enter image url.." @keyup.enter="onAddNote">
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
            notesService.addNote(this.note)
            console.log('this.note = ', this.note)
            // this.$router.go()


        },
    },
    computed: {
    },
}
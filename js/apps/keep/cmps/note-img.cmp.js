import { notesService } from "../keep-services/note.service.js"
import { utilService } from "../../../services/util-service.js"


export default {
    template: `
    <div class="txt-container">
    <input v-if="isExpand" type="text" placeholder="Title" class="title-input"
             @keyup.enter="onAddNote" v-model="note.info.title">


<!-- Entered image url will be set in note.info.url directly -->
    <input type="text" @click="this.isExpand = true" @keyup.enter="onAddNote" class="txt-input" v-model="note.info.url" placeholder="Enter image url..">
    <button v-if="isExpand" @click.stop="onAddNote" class="add-note-btn"><i class="fa-solid fa-circle-check"></i> Add note</button>
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
            setTimeout(() => {
                this.note.info.url = ''
                this.note.info.title = ''
            }, 300);
        },
    },
    computed: {
    },
}
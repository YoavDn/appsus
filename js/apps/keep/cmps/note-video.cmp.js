import { notesService } from "../keep-services/note.service.js"

export default {
    template: `
    <div class="txt-container">
    <input v-if="isExpand" type="text" placeholder="Title" class="title-input"
             @keyup.enter="onAddNote" v-model="note.info.title">

        <input type="text" @click="isExpand = true" class="txt-input" v-model="inComeUrl" placeholder="Enter video url.." @keyup.enter="onAddNote">
        <button v-if="isExpand" @click="onAddNote" class="add-note-btn"><i class="fa-solid fa-circle-check"></i> Add note</button>
    </div>
    `,
    data() {
        return {
            isExpand: false,
            inComeUrl: '',
            note: {
                type: 'note-video',
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

            if (this.inComeUrl === '') return
            this.note.info.url = this.embedVideo()

            this.$emit('noteAdded', this.note)
            console.log('this.note = ', this.note)
            // this.$router.go()


        },
         getVidId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
        
            return (match && match[2].length === 11)
              ? match[2]
              : null;
        },
        embedVideo(){
            const videoId = this.getVidId(this.inComeUrl)
            
            return `https://www.youtube.com/embed/${videoId}`
        }

    },
    computed: {
    },
}
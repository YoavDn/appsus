import { notesService } from "../keep-services/note.service.js"

export default {
    template: `
    <div class="txt-container">
    <button class="edit-btn record" @click="startRecording">
    <i class="fa-solid fa-microphone"></i>
    </button>
    <input v-if="isExpand" type="text" placeholder="Title" class="title-input"
             @keyup.enter="onAddNote" v-model="note.info.title">

        <button v-if="isExpand" @click="onAddNote" class="add-note-btn">Add note</button>
    </div>
    `,
    data() {
        return {
            isExpand: false,
            isRecording: false,
            note: {
                type: 'note-audio',
                isPinned: false,
                info: {
                    src: '',
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
            this.$emit('noteAdded', this.note)
            console.log('this.note = ', this.note)
            // this.$router.go()
        },
        startRecording(){
            var recorder
            var source 
            console.log('this.isRecording = ', this.isRecording)

            var device = navigator.mediaDevices.getUserMedia({audio: true})
            var items = []
            device.then(stream => {
                recorder = new MediaRecorder(stream)
                recorder.ondataavailable = e=> {
                    items.push(e.data)
                    if (recorder.state === 'inactive'){
                        console.log('hello = ')
                        var blob = new Blob(items, {type: 'audio/webm'})
                        this.note.info.src = URL.createObjectURL(blob)
                        
                    }
                }
                recorder.start(100)
                // this.isRecording = true
                setTimeout(() => {
                    recorder.stop()

                    this.onAddNote()
                }, 5000)

                

            })
        }
    },
    computed: {
    },
}

export default {
    template: `
    <div class="txt-container record-container">
    <p>Start</p>
    <button class="edit-btn record" @click="startRecording">
        
        <div class="mic">
            <p>Start</p>
        </div>
    </button>
    <p>Stop</p>
    <button @click="stopRecording" class="edit-btn record">
        <div class="stop"></div>
    </button>

    </div>
    `,
    data() {
        return {
            source: '',
            isExpand: false,
            isRecording: false,
            recorder: null,
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
        },
        startRecording() {
            if (this.isRecording) return
            this.isRecording = true
            let device = navigator.mediaDevices.getUserMedia({ audio: true })
            let chunks = []
            device.then(stream => {
                this.recorder = new MediaRecorder(stream)

                this.recorder.ondataavailable = e => {
                    chunks.push(e.data)

                   
                        if (this.recorder.state == 'inactive') {
                            let blob = new Blob(chunks, { type: 'audio/webm' })
                            this.note.info.src = `${URL.createObjectURL(blob)}`
                            this.onAddNote(this.note)
    
                        }

                }
                
                    this.recorder.start(1000)
                    document.querySelector('.mic').classList.add('rec')
                


            })
        },
        stopRecording(){
            if (!this.isRecording) return
            this.isRecording = false
            this.recorder.stop()
            document.querySelector('.mic').classList.remove('rec')
        }
    },
    computed: {

    },
}
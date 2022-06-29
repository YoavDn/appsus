export default {
    template: `
    <div class="txt-container shadow">
    <input v-if="isExpand" type="text" placeholder="Title" class="title-input"
             @keyup.enter="onAddNote" v-model="note.info.title">

        <input type="text" @click="isExpand = true" class="txt-input" placeholder="Enter image url.." @keyup.enter="onAddNote">
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

    },
    computed: {
    },
}
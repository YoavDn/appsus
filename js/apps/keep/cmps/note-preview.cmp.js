export default {
    props: ['note'],
    template: `
        <div v-if="note.type === 'note-text'" class="type-text">
            <h3>{{note.info.title}}</h3>
            <p>{{note.info.txt}}</p>
        </div>
        <div v-if="note.type === 'note-img'" class="type-text">
            <img :src=note.info.url alt="">
            <h3>{{note.info.title}}</h3>
        </div>
        <div v-if="note.type === 'note-video'" class="type-text">
        <iframe class="embededVideo" :src=note.info.url frameborder="0"></iframe>
            <h3>{{note.info.title}}</h3>
        </div>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
}
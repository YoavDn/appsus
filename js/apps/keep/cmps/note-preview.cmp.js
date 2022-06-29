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
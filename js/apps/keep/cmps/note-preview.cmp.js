export default {
    props:['note'],
    template: `
        <h3>{{note.info.title}}</h3>
        <p>{{note.info.txt}}</p>
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
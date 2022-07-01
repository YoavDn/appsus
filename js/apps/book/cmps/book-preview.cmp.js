export default {
    props: ['book'],
    template: `
    <!-- <img :src="book.thumbnail" alt=""> -->
    <router-link :to="'/book/'+book.id"><img :src="book.thumbnail"/></router-link>
        <h2 class="title">{{book.title}}</h2>
    `,
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
    },
    created() {
        console.log(this.book);

    }
}
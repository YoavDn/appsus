export default {
    props: ['book'],
    template: `
    <router-link :to="'/book/'+book.id"><img :src="book.thumbnail"/></router-link>
        <h2 class="title">{{book.title}}</h2>
    `,
}
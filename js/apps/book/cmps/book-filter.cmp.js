export default {
    template: `
    <section class="filter-books">
        <form>
            <label for="book-name">Book name: </label>
            <input id="book-name" placeholder="Book Name" @keyup.enter="filter" type="text" v-model="filterBy.name" @input="filter">
            <label for="book-price">Book price: </label>
            <input id="book-price" placeholder="Book price"  max="200" type="range" v-model="filterBy.price" @input="filter">
            <h2>{{filterBy.price}}</h2>
        </form>
    </section>

    `,
    data() {
        return {
            filterBy: {
                name: "",
                price: 0,

            },

        }
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy)
        }
    },
    computed: {
    },
}
import { bookService } from '../services/book.service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import reviewPost from '../cmps/review-post-cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
    template: `
        <router-link class="btn-back" :to="'/book/'"> &leftarrow; Back</router-link>
        <router-link class="next-book-btn" :to="'/book/' + nextBookId">Next book &rightarrow; </router-link>
        <section v-if="book" class="book-detail-page">
            <img :src="book.thumbnail" alt="">
            <div class="book-details">
                <h2 class="book-age">{{bookAge}}</h2>
                <div class="title-details">
                    <h2 class="book-title" >{{book.title}}</h2>
                    <h2 v-if="book.listPrice.isOnSale" class="sale">SALE</h2>
                </div>
                <h4 class="book-authors">{{book.authors[0]}}</h4>
                <h3 class="book-price-details" >Price: <span class="book-price" :class="priceStyle">{{bookPrice}}</span></h3>
                <h3 class="book-cat">Categories: <span class="categories">{{bookCat}}</span></h3>
                <h3 class="description-title">Description</h3>
                <p class="book-description">{{book.description}}</p>
                <h4 class="book-pages">{{book.pageCount}} pages/ {{bookPages}}</h4>
            </div> 
        </section>

        <h2 v-if="book" @click="postsOpen = !postsOpen" class="reviews-count">{{revCount}}: reviews <span v-if="book.reviews" class="arrows" v-html=toggleArrows></span></h2>
        <section v-if="postsOpen && book" class="reviews">
            <div class="post-reviews">
                <div v-for="rev in book.reviews" class="review-post">
                    <review-post :rev="rev" />
                </div>
            </div>            
        </section>
        
        <button class="add-review-btn" @click="reviewOpen = true"> Add review <span>&#9998;</span> </button>
        <section v-if="book && reviewOpen" class="review-section" >
             <review-add @formSend="addReview" :book="book" />
         </section>
    `,
    components: {
        reviewAdd,
        reviewPost,
    },

    data() {
        return {
            book: null,
            reviewOpen: false,
            postsOpen: false,
            nextBookId: null
        }
    },
    methods: {
        addReview(review) {
            console.log(review);
            bookService.addReview(this.book.id, review).then(book => {
                eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' })
                return this.book = book
            })

        }
    },
    computed: {
        bookPrice() {
            const amount = this.book.listPrice.amount
            const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(amount)
            return price
        },

        priceStyle() {
            return { cheap: this.book.listPrice.amount < 20, exp: this.book.listPrice.amount > 120 }
        },
        bookCat() {
            const cat = this.book.categories

            return `${cat[0]}/${cat[1]}`
        },
        bookAge() {
            const currYear = new Date().getFullYear()
            if (currYear - this.book.publishedDate > 10) return "Vetaran book"
            if (currYear - this.book.publishedDate < 1) return 'New book'
        },
        bookPages() {
            if (this.book.pageCount > 500) return 'Long Reading'
            return this.book.pageCount > 130 ? 'Decent reading' : 'Light reading'
        },
        revCount() {
            if (!this.book.reviews) return '0'
            return this.book.reviews.length
        },
        toggleArrows() {
            if (this.postsOpen) return 'See less &uparrow;'
            return " See more &downarrow;"
        }
    },
    created() {
        // const id = this.$route.params.bookId
        // bookService.get(id).then(book => this.book = book)
    },

    watch: {
        '$route.params.bookId': {
            handler() {
                const id = this.$route.params.bookId
                bookService.get(id).then(book => {

                    this.book = book
                    bookService.getNextBookId(book.id)
                        .then(nextBookId => {
                            return this.nextBookId = nextBookId
                        })
                })
            },
            immediate: true
        }

    }

}
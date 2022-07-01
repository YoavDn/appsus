import { eventBus } from '../../../services/eventBus-service.js'
import { bookService } from '../services/book.service.js'

export default {
    template: `
    <h2 class="new-book-header" >Add new book</h2>
    <form @submit.prevent="search">
        <input v-model="query" type="search" placeholder="Search">
        <button>Search</button>
    </form>
        <section v-if="googleBooks" class="google-options">

           <div v-for="(book, idx) in googleBooks" class="book-option">
            <div class="book-option-header">
                <h2>{{book.volumeInfo.title}}</h2>
                <button @click="addBook(book)">Add book</button>
                <button class="preview-details-btn" @click="togglePreview(idx)">Details</button>
            </div> 
            <section v-if="previewSections[idx]" class="preview-section">
                <div class="preview-details">
                    <h2>{{book.volumeInfo.title}}</h2>
                    <h3>{{book.volumeInfo.authors[0]}}</h3>
                    <p> Pages: {{book.volumeInfo.pageCount}}</p>
                </div>
                <img class="preview-img" :src="book.volumeInfo.imageLinks.thumbnail" alt="">
            </section>
           </div>


        </section>
    `,
    data() {
        return {
            query: '',
            googleBooks: null,
            previewSections: [],
        }
    },
    methods: {
        search() {
            bookService.getBookByQuery(this.query).then(books => {
                this.previewSections = new Array(books.length)
                return this.googleBooks = books
            })
        },
        addBook(book) {
            bookService.addGoogleBook(book)
            eventBus.emit('show-msg', { txt: `${book.volumeInfo.title}, added`, type: 'success' })
        },
        togglePreview(idx) {
            this.previewSections[idx] = !this.previewSections[idx]
        }
    },
    computed: {
    },
}
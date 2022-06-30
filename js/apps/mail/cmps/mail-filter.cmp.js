import { mailService } from "../services/mail.service.js"


export default {
    props: ['mails'],
    template: `
        <div class="filter-search-bar wrapper ">
            <form @click="suggestionsOpen = true" autocomplete="off" >
                <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                <input class="search" v-model="query" @input.prevent="makeSuggestion" name="search-bar" type="search" placeholder="Search mail">
            </form>
            <section v-if="suggestionsOpen" class="suggestions shadow">
                <nav flex>
                    <button class="filter-btn" ><span><i class="fa-solid fa-calendar"></i></span>last 7 days </button>
                    <button class="filter-btn" ><span><i class="fa-solid fa-user"></i></span>From me</button>
                </nav>
                <div v-for="suggest in suggestions" class="suggestion-item" @click="goToMailDetails(suggest.id)">
                    <div class="suggest-content">
                        <h2>{{suggest.subject}}</h2>
                        <p>{{suggest.from}}</p>
                    </div>
                  <div class="date">
                    <p>{{stringDate(suggest.sentAt)}}</p>
                  </div>
                </div>
            </section>
        </div>
    `,
    data() {
        return {
            query: '',
            filterBy: {
                from: '',
                lastWeek: null,
                isRead: null,
            },
            suggestions: null,
            suggestionsOpen: false,
        }
    },
    methods: {
        makeSuggestion() {
            this.suggestions = mailService.suggest(this.query, this.mails)
        },
        goToMailDetails(id) {
            this.$router.push(`/mail/${id}`)
        },

        stringDate(date) {
            const strDate = new Date(date).toLocaleString()
            return strDate
        }
    },
    computed: {},
    mounted() {
        window.addEventListener('click', (e) => {
            if (!e.target.classList.contains('filter-search-bar')
                && !e.target.classList.contains('search')) {
                this.suggestionsOpen = false
            }
        })
    }
}
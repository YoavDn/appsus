import { eventBus } from "../../../services/eventBus-service.js"
import { mailService } from "../services/mail.service.js"


export default {
    props: ['mails'],
    template: `
        <div class="filter-search-bar wrapper ">
            
            <form @click="suggestionsOpen = true" autocomplete="off" >
                <button v-if="mobile" @click="openSideBar" class="search-btn hamburger"><i class="fa-solid fa-bars"></i></button>
                <input class="search" v-model="filterBy.query" @input.prevent="makeSuggestion" name="search-bar" type="search" placeholder="Search mail">
            </form>
            <section v-if="suggestionsOpen" class="suggestions shadow">
                <nav flex>
                    <button @click.stop="toogleSearch('lastWeek')" class="filter-btn"><span v-html="lastWeekIcon"></span>last 7 days </button>
                    <button @click.stop="toogleSearch('isSent')" class="filter-btn"><span v-html="fromMeIcon"></span>From me</button>
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
            filterBy: {
                query: '',
                from: '',
                lastWeek: false,
                isSent: false,
            },
            suggestions: null,
            suggestionsOpen: false,
            mobile: false,
        }
    },
    methods: {
        makeSuggestion() {
            this.suggestions = mailService.suggest(this.filterBy, this.mails)
        },
        goToMailDetails(id) {
            this.$router.push(`/mail/${id}`)
        },

        stringDate(date) {
            const strDate = new Date(date).toLocaleString()
            return strDate
        },
        openSideBar() {
            eventBus.emit('openSideBar', true)
        },
        toogleSearch(filter) {
            this.filterBy[filter] = !this.filterBy[filter]
        }
    },
    computed: {
        lastWeekIcon() {
            if (this.filterBy.lastWeek) return `<i class="fa-solid fa-circle-check"></i>`
            return `<i class="fa-solid fa-calendar"></i>`
        },
        fromMeIcon() {
            if (this.filterBy.isSent) return `<i class="fa-solid fa-circle-check"></i>`
            return `<i class="fa-solid fa-user"></i>`
        }


    },
    mounted() {
        if (document.body.clientWidth < 750) this.mobile = true
        window.addEventListener('click', (e) => {
            if (!e.target.classList.contains('filter-search-bar')
                && !e.target.classList.contains('search')) {
                this.suggestionsOpen = false
            }
        })
    }

}
import starRate from './star-rate.cmp.js'

export default {
    props: ['book'],
    template: `
        <form @submit.prevent="send" class="review-form">
        <label for="full-name-input">* Full name:</label>
        <input v-model="formData.fullName" id="full-name-input" type="text" required>
        <label>* Rating:</label>
        <star-rate @starRate.prevent="rated" class="input-star-rate" id="rate-star"/>
        <label for="text-area">Review:</label>
        <textarea v-model="formData.review" id="text-area" rows="6" cols="80">Enter your reviews</textarea>
        <label for="date">Date</label>
        <input v-model="formData.date" type="date">
        <button @keyup.enter="send" >Send</button>

        </form>
    `,
    components: {
        starRate,
    }
    ,
    data() {
        return {
            formData: {
                fullName: '',
                rating: 0,
                review: '',
                date: null,
            }
        }
    },
    methods: {
        rated(event) {
            this.formData.rating = event.target.value
        }
        ,
        send() {
            this.$emit('formSend', this.formData)
            this.formData = {}
        }
    },

}
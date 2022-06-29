
export default {
    props: ['mail'],
    template: `
    <div class="item-header flex align-center">
        <div class="item-main-actions flex">
            <button>☐</button>
            <button>&bigstar;</button>
        </div>
        <h2 class="maill-item-from">{{mail.from}}</h2>
    </div>

    <div class="item-content flex align-center">
        <h2 class="item-subject bold">{{mail.subject}}</h2>
        <h2 class="thin"> - {{mail.body}}</h2>
    </div>
    <div class="item-date">
        <h2>{{stringDate}}</h2>
    </div>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        stringDate() {
            const date = new Date(this.mail.sentAt)
            const day = date.getDay() + 1
            const strMonth = date.toLocaleString('default', { month: 'short' });
            return day + " " + strMonth
        },
    },
    created() {
    },
}
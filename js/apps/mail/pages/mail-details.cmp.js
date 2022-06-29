export default {
    props: ['mail'],
    template: `
    <section class="mail-details">
        <nav class="details-nav flex">
            <router-link class="back-to-inbox" to="/mail"/>Back to inbox</router-link>
        </nav>
        <header class="details-header">
            <h2>{{mail.subject}}</h2>
        </header>
        <main class="main-details">
            <header class="main-details-header flex space-between">
                <div class="mail-user-details flex">
                    <img class="mail-details-avatar" :src="userAvatar" alt="">
                    <div class="detail-user-name">
                        <h2>{{mail.from}}</h2>
                        <p>to: {{mail.to}}</p>
                    </div>
                </div>
                <div class="details-date flex">
                    <p>{{stringDate}}</p>
                </div>
            </header>
            <main class="details-body">
                <pre class="text-body">{{mail.body}}</pre>
            </main>
            
        </main>
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        userAvatar() {
            const defaultUserImg = '/assest/images/user.png'
            return this.mail.avatar || defaultUserImg
        },
        stringDate() {
            const strDate = new Date(this.mail.sentAt).toLocaleString()
            return strDate
        }
    },
}
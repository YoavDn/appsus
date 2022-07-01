
export default {
    template: `
    <section class="hero">
        <div class="hero-text">
            <h2> <span class="a-logo">A</span>ppsus</h2>
            <h3>Make your life easier</h3>

        </div>
        <img src="/assest/images/circles.svg" alt="">
    </section>
    <section class="features-section">
        <h2 class="features-title">Features</h2>
        <div class="features-cards flex space-between">
                <div class="mail-feature feature-card shadow">
                    <h2>Appsus Mail</h2>
                    <p>Check out Appsus Mail and get the latest mail features that will push your communication to the limit</p>
                       <router-link class="feature-link router-link" to="/mail">Go to Mail</router-link>

                </div>
                <div class="keep-feature feature-card shadow">
                    <h2>Appsus Keep</h2>
                    <p>Check out Appsus Keep to follow tasks, keep notes, videos and images</p>
                    <router-link class="feature-link router-link" to="/keep">Go to Keep</router-link>

                </div>
                <div class="books-feature feature-card shadow">
                    <h2>Appsus Books</h2>
                    <p>Check out Appsus Books and get the best books from 1960 to 2022 with best prices in the market for new users in Appsus!</p>
                    <router-link class=" feature-link router-link" to="/book">Go to Books</router-link>

                </div>
            </div>
            <h2 class="footer">Created by Afik and Yoav</h2>
    </section>
    `,
}
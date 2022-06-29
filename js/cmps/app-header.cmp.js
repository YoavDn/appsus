
export default {
    template: `
    <section class="header-container">
        <header class="main-header flex space-between">
            <h2 class="logo">Logo</h2>
            <nav class="main-nav">
                <ul class="flex space-between" >
                    <router-link class="router-link" to="/mail">Mail</router-link>
                    <router-link class="router-link" to="/keep">Keep</router-link>

                </ul>
            </nav>
        </header>
    </section>
    `,
}

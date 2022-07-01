export default {
    props: ['rev'],
    template: `
            <h3><span v-for="num in +rev.rating">&bigstar;</span>{{rev.rating}} stars</h3>
            <div class="main-post">
                <h2>{{rev.fullName}}</h2>
                <h4>{{rev.date}}</h4>
            </div>
            <p>{{rev.review}}</p>
            `,
}
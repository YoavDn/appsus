
export default {
    props: ['mail'],
    template: `
        <div class="item-header flex align-center">
            <div class="item-main-actions flex">
            <input type="checkbox" @click.stop="selectMail">
            <button :class="starStyle" v-html=star @click.stop="toggleStar"></button>
        </div>
        <h2 class="maill-item-from">{{mail.from}}</h2>
        </div>

        <div class="item-content flex align-center"
         @mouseover="isHovered = true"
         @mouseleave="isHovered = false">
            <h2 class="item-subject bold">{{mail.subject}}</h2>
            <h2 class="thin"> - {{mail.body}}</h2>
        </div>
        <div v-if="!isHovered" class="item-date"
         @mouseover="isHovered = true"
         @mouseleave="isHovered = false">
            <h2 :class="{thin: mail.isRead}">{{stringDate}}</h2>
        </div>
        <div class="preview-options"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        v-else>
            <button type="button" data-toggle="tooltip" data-placement="top" title="Move to trash"  class="preview-options-btn"><i class="fa-solid fa-trash"></i></button>
            <button type="button" data-toggle="tooltip" data-placement="top" title="Mark as read" class="preview-options-btn"><i class="fa-solid fa-envelope-open"></i></button>
        </div>
    `,
    data() {
        return {
            isSelected: false,
            isHovered: false
        }
    },
    methods: {
        toggleStar() {
            this.mail.isStar = !this.mail.isStar;
        },
        selectMail(e) {
            // TODO: support this feature,
        }
    },
    computed: {
        stringDate() {
            const date = new Date(this.mail.sentAt)
            const day = date.getDay() + 1
            const strMonth = date.toLocaleString('default', { month: 'short' });
            return day + " " + strMonth
        },
        star() {
            return this.mail.isStar ? '&bigstar;' : '&star;'
        },
        starStyle() {
            return { star: this.mail.isStar, notStar: !this.mail.isStar }
        }
    },



}
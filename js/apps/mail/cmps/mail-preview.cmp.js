
export default {
    props: ['mail'],
    emits: ['movedToTrash', 'markAsRead', 'selectedMail'],
    template: `
        <div class="item-header flex align-center">
            <div class="item-main-actions flex">
            <input type="checkbox" @click.stop="selectMail" data-title="Select">
            <button :class="starStyle" v-html=star @click.stop="toggleStar" data-title="Starred"></button>
        </div>
        <h2 :class="fromToStyle" class="maill-item-from">{{fromOrTo}}</h2>
        </div>

        <div class="item-content flex align-center"
         @mouseover="isHovered = true"
         @mouseleave="isHovered = false">
            <h2 class="item-subject bold">{{subjectText}}</h2>
            <h2 class="thin"> - {{bodyText}}</h2>
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
            <button type="button" data-title="Move to Trash" class="preview-options-btn"><i class="fa-solid fa-trash"
            @click.stop="moveToTrash"></i></button>
            <button type="button" data-title="mark as read" class="preview-options-btn"><i class="fa-solid fa-envelope-open"
            @click.stop="markAsRead"></i></button>
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
            this.$emit('selectedMail', this.mail)
        },
        moveToTrash() {
            this.$emit('movedToTrash', this.mail)
        },
        markAsRead() {
            this.$emit('markAsRead')
        },

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
        },
        bodyText() {
            if (this.mail.body.length > 80) return this.mail.body.slice(0, 40) + '...'
            return this.mail.body
        },
        subjectText() {
            if (this.mail.subject.length > 20) return this.mail.subject.slice(0, 20) + '...'
            return this.mail.subject
        },
        fromOrTo() {
            if (this.mail.sent) return `To: ${this.mail.to}`
            return this.mail.from
        },
        fromToStyle() {
            return { thin: this.mail.isRead, bold: !this.mail.isRead }
        }
    },
    created() { }
}
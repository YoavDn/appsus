import { eventBus } from "../../../services/eventBus-service.js";

export default {
    props: ['mail'],
    emits: ['movedToTrash', 'markAsRead', 'selectedMail'],
    template: `
        <div class="item-header flex align-center">
            <div class="item-main-actions flex">
            <input v-if="!mobile" type="checkbox" @click.stop="selectMail" data-title="Select">
            <button v-if="!mobile" :class="starStyle" v-html=star @click.stop="toggleStar" data-title="Starred"></button>
            <h2 v-if="mobile" :class="thinIfRead">{{stringDate}}</h2>
        </div>
        <h2 :class="thinIfRead" class="maill-item-from">{{fromOrTo}}</h2>
        </div>

        <div class="item-content flex align-center"
         @mouseover="onHover"
         @mouseleave="onLeaveHover">
            <h2 :class="thinIfRead" class="item-subject">{{subjectText}}</h2>
            <h3 class="thin">{{bodyComma}}&nbsp;{{bodyText}}</h3>
        </div>
        <div v-if="!isHovered" class="item-date"
         @mouseover="onHover"
         @mouseleave="onLeaveHover">
            <h2 v-if="!mobile" :class="thinIfRead">{{stringDate}}</h2>
        </div>
        <div class="preview-options"
        @mouseover="onHover"
        @mouseleave="onLeaveHover"
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
            isHovered: false,
            mobile: false,
        }
    },
    methods: {
        toggleStar() {
            this.mail.isStar = !this.mail.isStar;
        },
        selectMail() {
            this.$emit('selectedMail', this.mail)
        },
        moveToTrash() {
            eventBus.emit('show-msg', 'Mail moved to trash')
            this.$emit('movedToTrash', this.mail)
        },
        markAsRead() {
            this.$emit('markAsRead')
        },
        // TODO: make this Dry
        onHover() {
            if (this.mobile) return
            this.isHovered = true
        },
        onLeaveHover() {
            if (this.mobile) return
            this.isHovered = false
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
        thinIfRead() {
            return { thin: this.mail.isRead }
        },
        bodyComma() {
            if (this.mobile) return
            return "-"
        }
    },
    created() { },
    mounted() {
        if (document.body.clientWidth < 750) this.mobile = true
    }

}
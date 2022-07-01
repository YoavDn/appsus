import { eventBus } from "../../../services/eventBus-service.js"

export default {
    template: `
    <section class="side-bar-keep">

        <div @click="activate" class="side-bar-items">
            <button  class="side-bar-btn bold" @click="$emit('filter', null)"><i class="fa-solid fa-clipboard"></i> <span>All Notes</span></button>
            <button @click="$emit('filter', 'note-text')" class="side-bar-btn"><i class="fa-regular fa-comment"></i> <span>Text Notes</span></button>
            <button @click="$emit('filter', 'note-img')" class="side-bar-btn"><i class="fa-solid fa-image"></i> <span>Images Notes</span></button>
            <button @click="$emit('filter', 'note-video')" class="side-bar-btn"><i class="fab fa-youtube"></i> <span>Video Notes</span></button>
            <button @click="$emit('filter', 'note-todos')" class="side-bar-btn"><i class="fa fa-list"></i> <span>Todo Notes</span></button>
            
        </div>
    </section>
    `,
    data() {
        return {
            activeSidebar: 'true'
        }
    },
    methods: {

        activate(e) {
            if (!e.target.classList.contains('side-bar-btn')) return
            document.querySelectorAll('.side-bar-btn').forEach(el => el.classList.remove('active'))
            e.target.classList.add('active');

        },
    },
    computed: {
   
        activeStyle() {
            return { active: this.activeSidebar }
        }
    },
}
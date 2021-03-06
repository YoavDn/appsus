import { eventBus } from "../../../services/eventBus-service.js"

export default {
    template: `
    <section class="side-bar-keep">

<!-- Side bar buttons that changes the filter of the notes showing on screen -->
        <div @click="activate" class="side-bar-items-keep">
            <button @click="$emit('filter', null)" class="keep-bar-btn active"><i class="fa-solid fa-clipboard"></i> All Notes</button>
            <button @click="$emit('filter', 'note-text')" class="keep-bar-btn"><i class="fa-regular fa-comment"></i> Text</button>
            <button @click="$emit('filter', 'note-img')" class="keep-bar-btn"><i class="fa-solid fa-image"></i> Images</button>
            <button @click="$emit('filter', 'note-video')" class="keep-bar-btn"><i class="fab fa-youtube"></i> Video</button>
            <button @click="$emit('filter', 'note-audio')" class="keep-bar-btn"><i class="fa-solid fa-microphone"></i> Audio</button>
            <button @click="$emit('filter', 'note-todos')" class="keep-bar-btn"><i class="fa fa-list"></i> Todo</button>
            
        </div>
    </section>
    `,
    data() {
        return {
            activeSidebar: 'true'
        }
    },
    methods: {

// Mark the current filter by marking the buttons of it
        activate(e) {
            if (!e.target.classList.contains('keep-bar-btn')) return
            document.querySelectorAll('.keep-bar-btn').forEach(el => el.classList.remove('active'))
            e.target.classList.add('active');

        },
    },
    computed: {
   
        activeStyle() {
            return { active: this.activeSidebar }
        }
    },
}
<template>
    <div>
        <div id="editor" @keydown.ctrl.s="saveStory">
            <vue-editor id="vueEditor"  v-model="content" :editorToolbar="customToolbar" @text-change="limitWarn"></vue-editor>
        </div>
        <v-slide-y-transition>
            <p id="lastSave" class="lightFont" v-if="this.$store.state.lastSave"><span class="accent--text">Last Save: </span>{{ this.$store.state.lastSave }}</p>
        </v-slide-y-transition>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import swal from "sweetalert2"
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            customToolbar: [
                [{
                    'header': [1, 2, false]
                }],
                [{
                    align: ''
                }, {
                    align: 'center'
                }],
                ['bold', 'italic', 'underline'],
                [{
                    'list': 'ordered'
                }, {
                    'list': 'bullet'
                }],
                [{ 'color': [] }, { 'background': [] }]
            ],
            scrollAmount: null
        }
    },
    methods: {
        saveStory() {
            this.$store.dispatch("saveStory", this.$store.state.currentStory);
        },
        limitWarn(quill) {
            if (this.content.length > 70005) {
                swal({
                title: 'Too Long',
                text: "You're story is too long. We will only save up to the limit",
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#e06b6b',
                confirmButtonText: 'OK',
                customClass: "alert"
                })
            }
        }
    },
    computed: {
        content: {
            get() {
                return this.$store.state.currentStory.story
            },
            set(value) {
                this.$store.commit("UPDATE_CURRENT_STORY_CONTENT", value);
            }
        }
    },
    activated() {
        if (this.scrollAmount) {
            document.getElementById("vueEditor").firstElementChild.scrollBy(0, this.scrollAmount);
        }
    },
    deactivated() {
        this.scrollAmount = document.getElementById("vueEditor").firstElementChild.scrollTop;
    }
}
</script>

<style scoped>
#editor {
    background-color: #fff;
    border-radius: 20px;
    height: 650px;
    padding: 10px;
}
</style>



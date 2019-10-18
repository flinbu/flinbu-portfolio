<template>
    <b-modal 
        v-model="showModal" 
        modal-class="modal modal__request-cv"
        hide-footer
        hide-header
        @hidden="showModal = false"
    >
        <button @click="closeModal" class="modal__close"><i class="bx bx-x"/></button>
        <b-embed
            type="iframe"
            :src="formUrl"
            height="100%"
            aspect="1by1"
            class="model__request-cv--frame"
        />
    </b-modal>
</template>
<script>
export default {
    data() {
        return {
            showModal: false,
            formUrl: 'https://airtable.com/embed/shri0wtfYhm6JK9RY?backgroundColor=white'
        }
    },
    methods: {
        closeModal() {
            this.showModal = false
        },
        resizeFrame() {
            let frame = this.$refs.frame
            frame.style.height = frame.contentWindow.document.body.scrollHeight + 'px'
        }
    },
    mounted() {
        this.$root.$on('RequestModal', open => {
            this.showModal = open
        })
    }
}
</script>
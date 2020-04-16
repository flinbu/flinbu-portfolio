<template>
    <b-modal 
        v-model="showModal" 
        modal-class="modal"
        hide-footer
        hide-header
        @hidden="showModal = false"
    >
        <button @click="closeModal" class="modal__close"><i class="bx bx-x"/></button>
        <b-col class="module__data order-2 order-lg-1" cols="12">
            <h3 class="module__subtitle mb-2 text-center text-lg-left" v-html="labels.subtitle"/>
            <h2 class="module__title mb-5 text-center text-lg-left" v-html="labels.title"/>
            <contact-form/>
        </b-col>
    </b-modal>
</template>
<script>
export default {
    data() {
        return {
            showModal: false,
            labels: {
                title: "Send me a quote",
                subtitle: "Let's talk. Together."
            }
        }
    },
    methods: {
        closeModal() {
            this.showModal = false
        }
    },
    mounted() {
        this.$root.$on('ContactModal', open => {
            this.showModal = open
        })
    }
}
</script>
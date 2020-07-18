<template>
    <b-modal
        v-model="showModal"
        :modal-class="`modal creation-process__modal modal__${theme}`"
        content-class="creation-process__modal--content"
        dialog-class="creation-process__modal--dialog"
        hide-footer
        hide-header
        centered
        @hidden="showModal = false"
    >
        <button @click="closeModal" class="modal__close"><i class="bx bx-x"/></button>

        <b-container class="creation-process__modal--content fluid">
            <b-row>
                {{ steps }}
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
export default {
    data() {
        return {
            step: false,
            steps: false,
            showModal: false,
            theme: 'light'
        }
    },
    methods: {
        closeModal() {
            this.showModal = false
        }
    },
    mounted() {
        this.$root.$on('CreationStep', ({step, steps}) => {
            this.step = step
            this.steps = steps
            this.showModal = true
        })

        let scheme = this.$cookies.get('color-scheme')
        this.theme = scheme ? scheme : 'light'

        this.$root.$on('scheme', scheme => this.scheme = scheme)
    }
}
</script>
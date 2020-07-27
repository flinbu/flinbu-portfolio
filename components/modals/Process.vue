<template>
    <b-modal
        v-model="showModal"
        :modal-class="`modal modal__process modal__${theme}`"
        content-class="modal__process--content"
        dialog-class="modal__process--dialog"
        hide-footer
        hide-header
        size="xl"
        centered
        scrollable
        @hidden="showModal = false"
    >
        <button class="modal__close" @click="showModal = false"><icon name="x"/></button>
        <b-container fluid class="modal__process--content">
            <b-row>
                <creation-process class="modal__process--process"/>
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
import CreationProcess from '~/components/modules/CreationProcessSlider'
export default {
    components: {
        CreationProcess
    },
    data() {
        return {
            showModal: false,
            theme: 'light'
        }
    },
    mounted() {
        this.$root.$on('showProcess', () => this.showModal = true)

        let scheme = this.$cookies.get('color-scheme')
        this.theme = scheme ? scheme : 'light'
        this.$root.$on('scheme', scheme => this.theme = scheme)
    }
}
</script>
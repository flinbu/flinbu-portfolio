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
                <contact />
            </b-row>
        </b-container>
    </b-modal>
</template>
<script>
import Contact from '~/components/modules/Contact'
export default {
    components: {
        Contact
    },
    data() {
        return {
            showModal: false,
            theme: 'dark'
        }
    },
    mounted() {
        this.$root.$on('showContact', () => this.showModal = true)

        let scheme = this.$cookies.get('color-scheme')
        this.theme = scheme ? scheme : 'dark'
        this.$root.$on('scheme', scheme => this.theme = scheme)
    }
}
</script>
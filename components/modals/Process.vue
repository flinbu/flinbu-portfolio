<template>
    <b-modal
        v-model="showModal"
        :modal-class="`modal modal__process modal__${theme}`"
        content-class="modal__process--content w-100"
        dialog-class="modal__process--dialog"
        body-class="modal__process--body"
        hide-footer
        hide-header
        size="xl"
        centered
        scrollable
        @hidden="showModal = false"
        @shown="onShow"
    >
        <button class="modal__close" @click="showModal = false"><icon name="x"/></button>
        <b-container fluid class="modal__process--content">
            <b-row class="w-100">
                <creation-process class="modal__process--process" ref="process"/>
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
            theme: 'dark'
        }
    },
    methods: {
        onShow() {
            const process = this.$refs.process
            if (process) process.updateWidth()
        }
    },
    mounted() {
        this.$root.$on('showProcess', () => this.showModal = true)

        let scheme = this.$cookies.get('color-scheme')
        this.theme = scheme ? scheme : 'dark'
        this.$root.$on('scheme', scheme => this.theme = scheme)
    }
}
</script>
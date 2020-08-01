<template>
    <div v-if="show" :class="`loader__wrapper ${animationClass}`">
        <div class="loader">
            <logo class="loader__logo"/>
            <div class="loader__spinner"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            status: true,
            show: true,
            animationClass: ''
        }
    },
    watch: {
        status(status) {
            if (status) {
                this.showLoader()
            } else {
                this.hideLoader()
            }
        }
    },
    methods: {
        showLoader() {
            this.show = true
            this.animationClass = 'animated fadeIn'
        },
        hideLoader() {
            this.animationClass = 'animated fadeOut'
            setTimeout(() => {
                this.animationClass = ''
                this.show = false
            }, 500)
        }
    },
    mounted() {
        this.$root.$on('loading', status => this.status = status)
    }
}
</script>
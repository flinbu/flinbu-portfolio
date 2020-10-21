<template>
    <b-form-checkbox
        switch
        size="lg"
        class="scheme-switch"
        v-model="darkMode"
    >
        <span v-if="location == 'menu'">{{ $t('components.scheme_switch.label') }}</span>
        <i v-else-if="location == 'header'" class="bx bx-moon"></i>
    </b-form-checkbox>
</template>
<script>
export default {
    props: {
        location: {
            type: String,
            default: 'menu'
        }
    },
    data() {
        return {
            darkMode: true
        }
    },
    watch: {
        darkMode(status) {
            this.$root.$emit('scheme', status ? 'dark' : 'light')
        }
    },
    mounted() {
        // let cookie = this.$cookies.get('color-scheme')
        // if ( cookie) {
        //     this.darkMode = cookie == 'dark' ? true : false
        // } else {
        //     this.darkMode = false
        // }
        this.$root.$on('scheme', scheme => {
            this.darkMode = scheme == 'dark' ? true : false
        })
    }
}
</script>
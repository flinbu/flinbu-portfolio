<template>
    <b-button 
        @click="goBack()"
        variant="link"
        :class="`back-button back-button__${showBack ? 'show' : 'hide'}`"
    >
        <icon
            name="chevron-left"
            size="sm"
        />
    </b-button>
</template>
<script>
export default {
    computed: {
        showBack() {
            let showNames = [
                'portfolio',
                'portfolio-slug',
                'about'
            ]
            let currentRoute = this.$route.name
            console.log(currentRoute)
            return showNames.indexOf(currentRoute) !== -1
        }
    },
    methods: {
        goBack() {
            const currentRoute = this.$route.name
            switch (currentRoute) {
                case 'portfolio-slug':
                    return this.$router.push('/portfolio')
                case 'portfolio':
                    return this.$router.push('/')
                default:
                    return this.$router.back()
            }
        }
    }
}
</script>
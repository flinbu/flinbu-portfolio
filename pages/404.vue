<template>
</template> 
<script>
export default {
    mounted() {
        const currentQuery = this.$route.query.page
        const link = this.$router.resolve({
            path: currentQuery.fullPath
        })
        if (link) {
            this.$router.push(currentQuery.fullPath)
        } else {
            this.$route.push('/')
        }
    }
}
</script>
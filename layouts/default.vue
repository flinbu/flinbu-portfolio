<template>
  <main :class="`app app__${scheme}`">
    <app-header/>
    <nuxt/>
    <app-footer v-if="!hideFooter"/>
    <modals/>
  </main>
</template>
<script>
export default {
  data() {
    return {
      scheme: 'light'
    }
  },
  computed: {
    hideFooter() {
      return this.$route.matched.map(r => {
        return (r.components.default.options ? r.components.default.options.hideFooter : false)
      })[0]
    }
  },
  watch: {
    scheme(scheme) {
      this.$root.$emit('scheme', this.scheme)
    }
  },
  mounted() {
    let cookie = this.$cookies.get('color-scheme')
    if (cookie) {
      this.scheme = cookie
    } else {
      if (window.matchMedia) {
        this.scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        this.$cookies.set('color-scheme', this.scheme)
        this.$root.$emit('scheme', this.scheme)
      }
    }
    this.$root.$on('scheme', scheme => {
      this.scheme = scheme
      this.$cookies.set('color-scheme', this.scheme)
    })
  }
}
</script>
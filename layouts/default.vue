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
  props: {
    hideFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scheme: 'light'
    }
  },
  watch: {
    scheme(scheme) {
      this.$root.$emit('scheme', this.scheme)
    }
  },
  mounted() {
    // Load data
    this.$store.dispatch('portfolio/fetch')

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
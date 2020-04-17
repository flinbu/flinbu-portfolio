<template>
  <main :class="`app app__${scheme}`">
    <app-header/>
    <slot/>
    <app-footer/>
    <modals />
  </main>
</template>
<script>
export default {
  data() {
    return {
      scheme: 'light'
    }
  },
  watch: {
    scheme(scheme) {
      this.$cookies.set('color-scheme', scheme)
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
      }
    }
    this.$root.$on('scheme', scheme => {
      this.scheme = scheme
      this.$cookies.set('color-scheme', this.scheme)
    })
  }
}
</script>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<template>
  <main :class="`app app__${scheme}`">
    <app-header/>
    <nuxt/>
    <app-footer v-if="!hideFooter"/>
    <modals/>
    <loader-overlay/>

    <!-- Chat -->
    <div v-if="contact && contact.chat && contact.chat_code" v-html="contact.chat_code"/>

  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      scheme: 'dark'
    }
  },
  computed: {
    ...mapGetters({
      app_data: 'app_data',
      contact: 'contact'
    }),
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
  methods: {
    ...mapActions({
      get_app_data: 'get_app_data'
    })
  },
  async fetch() {
    if (!this.app_data) await this.get_app_data()
  },
  mounted() {
    this.$root.$on('scheme', scheme => {
      this.scheme = scheme
      this.$cookies.set('color-scheme', this.scheme)
    })
  }
}
</script>
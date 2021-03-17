<template>
  <main :class="`app app__${scheme}`">
    <app-header/>
    <nuxt/>
    <app-footer v-if="!hideFooter"/>
    <modals/>
    <loader-overlay/>
    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/60525b37f7ce182709312f67/1f10r8ksi';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    </script>
    <!--End of Tawk.to Script-->
  </main>
</template>
<script>
export default {
  data() {
    return {
      scheme: 'dark'
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
    // let cookie = this.$cookies.get('color-scheme')
    // if (cookie) {
    //   this.scheme = cookie
    // } else {
    //   if (window.matchMedia) {
    //     this.scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    //     this.$cookies.set('color-scheme', this.scheme)
    //     this.$root.$emit('scheme', this.scheme)
    //   }
    // }
    this.$root.$on('scheme', scheme => {
      this.scheme = scheme
      this.$cookies.set('color-scheme', this.scheme)
    })
  }
}
</script>
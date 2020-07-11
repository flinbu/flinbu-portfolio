
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.SITE_NAME || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.SITE_DESCRIPTION || process.env.npm_package_description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      {
        src: process.env.SMALLCHAT_URL || ''
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    "hooper/dist/hooper.css",
    "@/assets/scss/app.scss"
  ],
  loading: {
    color: '#E95841'
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~plugins/cookies.js' },
    { src: '~plugins/i18n.js' },
    { src: '~plugins/modal.js', mode: 'client' },
    { src: '~plugins/lazyload.js' },
    { src: '~plugins/sticky-kit.js' },
    { src: '~plugins/global-components.js' }
  ],
  router: {
    middleware: ['i18n'],
    base: '/',
    linkExactActiveClass: 'active'
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@aceforth/nuxt-optimized-images',
  ],
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-webfontloader',
    'vue-scrollto/nuxt'
  ],
  // Bootsrap Config
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  // Load fonts
  webfontloader: {
    google: {
      families: [
        'Montserrat:300,400,500,600,700&display=swap'
      ]
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}

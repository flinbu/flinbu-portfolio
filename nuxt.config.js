import CockpitSDK from 'cockpit-sdk'
const cockpit = new CockpitSDK({
  host: process.env.API_HOST,
  accessToken: process.env.API_TOKEN
})
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
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
      // {
      //   src: process.env.SMALLCHAT_ID ? `https://embed.small.chat/${process.env.SMALLCHAT_ID}.js` : ''
      // }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
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
    { src: '~plugins/cookies' },
    { src: '~plugins/i18n' },
    { src: '~plugins/modal', mode: 'client' },
    { src: '~plugins/lazyload' },
    { src: '~plugins/sticky-kit' },
    { src: '~plugins/global-components' },
    { src: '~plugins/visibility' },
    { src: '~/plugins/sendgrid'}
  ],
  router: {
    middleware: ['i18n'],
    base: '/',
    linkExactActiveClass: 'active',
    routes: [
      { 
        name: 'portfolio-item',
        path: '/portfolio/:slug',
        component: 'pages/portfolio/_slug.vue'
      }
    ]
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
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_UA || ''
    }]
  ],
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false
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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-webfontloader',
    'vue-scrollto/nuxt',
    '@pnodev/nuxt-directus',
    'cookie-universal-nuxt'
  ],
  // Robots
  robots: { 
    UserAgent: '*',
    Disallow: '/cms',
    Allow: '*',
    Sitemap: 'https://flinbu.co/sitemap.xml'
  },
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
  // Sitemap
  sitemap: {
    hostname: process.env.SITE_URL,
    gzip: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API || 'https://api.flinbu.co'
  },
  directus: {
    apiUrl: process.env.API || 'https://api.flinbu.co'
  },
  env: {
    apiUrl: process.env.API || 'https://api.flinbu.co',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    SMTP_FROM: process.env.SMTP_FROM
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  generate: {
    async routes () {
      const posts = await cockpit.collectionGet('portfolio')
      return posts.entries.map( post => {
        return `/portfolio/${post.title_slug}`
      })
    }
  }
}

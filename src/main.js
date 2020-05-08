//Frontend framework
import BootstrapVue from 'bootstrap-vue'
import VueScrollTo from "vue-scrollto"
import VueCookies from 'vue-cookies'

//Styles
import '~/scss/app.scss'

//Components
import DefaultLayout from '~/layouts/Default.vue'
import CleanLayout from '~/layouts/Clean.vue'
import SocialMenu from "~/components/SocialMenu"
import Header from "~/components/Header"
import Icon from "~/components/Icon"
import AppButton from "~/components/AppButton"
import ButtonGroup from "~/components/ButtonGroup"
import LogoList from "~/components/LogoList"
import AppFooter from "~/components/AppFooter"
import ContactForm from "~/components/ContactForm"
import ModuleTitle from "~/components/ModuleTitle"
import SchemeSwitch from "~/components/SchemeSwitch"
import LangSwitch from "~/components/LangSwitch"
import ImageSlider from "~/components/ImageSlider"
import Menu from '~/components/Menu'

//Modules
import Hero from "~/components/modules/Hero"
import UIDesign from "~/components/modules/UIDesign"
import DataVisualization from "~/components/modules/DataVisualization"
import FrontendDevelopment from "~/components/modules/FrontendDevelopment"
import CreationProccess from "~/components/modules/CreationProccess"
import Contact from "~/components/modules/Contact"
import Modals from '~/components/Modals'

//SVG Assets
import Brand from "~/assets/images/logo.svg"
import BrandLight from "~/assets/images/logo-light.svg"
import BrandDark from "~/assets/images/logo-dark.svg"

//Plugins
import ImagePath from "~/plugins/ImagePath.js"

export default function (Vue, { appOptions, router, head, isClient }) {

  //Frontend framework
  Vue.use(BootstrapVue)
  Vue.use(VueScrollTo)
  Vue.use(VueCookies)

  //Mixins
  Vue.mixin(ImagePath)

  //Components
  Vue.component('Layout', DefaultLayout)
  Vue.component('CleanLayout', CleanLayout)
  Vue.component('SocialMenu', SocialMenu)
  Vue.component('AppHeader', Header)
  Vue.component('Icon', Icon)
  Vue.component('AppButton', AppButton)
  Vue.component('ButtonGroup', ButtonGroup)
  Vue.component('LogoList', LogoList)
  Vue.component('AppFooter', AppFooter)
  Vue.component('ContactForm', ContactForm)
  Vue.component('Modals', Modals)
  Vue.component('ModuleTitle', ModuleTitle)
  Vue.component('SchemeSwitch', SchemeSwitch)
  Vue.component('LangSwitch', LangSwitch)
  Vue.component('ImageSlider', ImageSlider)
  Vue.component('AppMenu', Menu)

  //Modules
  Vue.component('Hero', Hero)
  Vue.component('UIDesign', UIDesign)
  Vue.component('DataVisualization', DataVisualization)
  Vue.component('FrontendDevelopment', FrontendDevelopment)
  Vue.component('CreationProccess', CreationProccess)
  Vue.component('Contact', Contact)

  //SVG Assets
  Vue.component('Brand', Brand)
  Vue.component('BrandLight', BrandLight)
  Vue.component('BrandDark', BrandDark)

  let smallChat = process.env.GRIDSOME_SMALLCHAT_URL
  let piwik = process.env.GRIDSOME_PIWIK_ID
  let piwikURL = process.env.GRIDSOME_PIWIK_URL

  //Load libraries on head
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap"
  })

  if (smallChat) {
    head.script.push({
      src: smallChat,
      body: true,
      assync: true
    })
  }

  if (piwik && piwikURL) {
    // Custom analytics
    head.script.push({
      innerHTML: `var _paq = window._paq || []; /* tracker methods like "setCustomDimension" should be called before "trackPageView" */ _paq.push(['trackPageView']); _paq.push(['enableLinkTracking']); (function() { var u="${piwikURL}"; _paq.push(['setTrackerUrl', u+'matomo.php']); _paq.push(['setSiteId', '${piwik}']); var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);})();`,
      type: 'text/javascript'
    })
  }

  // Locales
  appOptions.i18n.setLocaleMessage('en', require('./locales/en.json'))
  appOptions.i18n.setLocaleMessage('es', require('./locales/es.json'))
}

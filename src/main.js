//Frontend framework
import BootstrapVue from 'bootstrap-vue'

//Styles
import '~/scss/app.scss'

//Components
import DefaultLayout from '~/layouts/Default.vue'
import SocialMenu from "~/components/SocialMenu"
import Header from "~/components/Header"
import Icon from "~/components/Icon"
import AppButton from "~/components/AppButton"
import ButtonGroup from "~/components/ButtonGroup"
import LogoList from "~/components/LogoList"
import AppFooter from "~/components/AppFooter"

//Modules
import Hero from "~/components/modules/Hero"
import UIDesign from "~/components/modules/UIDesign"
import DataVisualization from "~/components/modules/DataVisualization"
import FrontendDevelopment from "~/components/modules/FrontendDevelopment"
import CreationProccess from "~/components/modules/CreationProccess"
import Contact from "~/components/modules/Contact"

//SVG Assets
import Brand from "~/assets/images/logo.svg"
import BrandLight from "~/assets/images/logo-light.svg"
import BrandDark from "~/assets/images/logo-dark.svg"

//Plugins
import ImagePath from "~/plugins/ImagePath.js"

export default function (Vue, { router, head, isClient }) {

  //Frontend framework
  Vue.use(BootstrapVue)

  //Mixins
  Vue.mixin(ImagePath)

  //Components
  Vue.component('Layout', DefaultLayout)
  Vue.component('SocialMenu', SocialMenu)
  Vue.component('AppHeader', Header)
  Vue.component('Icon', Icon)
  Vue.component('AppButton', AppButton)
  Vue.component('ButtonGroup', ButtonGroup)
  Vue.component('LogoList', LogoList)
  Vue.component('AppFooter', AppFooter)

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

  //Load libraries on head
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&display=swap"
  })
  head.script.push({
    src: "https://embed.small.chat/T105JNEHFGC1Q3EWSG.js",
    body: true,
    assync: true
  })
}

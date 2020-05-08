<template>
    <div v-if="logos" class="logo-list__wrapper">
        <ul v-if="logos == 'tech'" :class="listClass">
            <li class="logo-list__item">
                <NSLogo
                    title="NativeScript"
                    :width="logoWidth"
                />
            </li>
            <li class="logo-list__item">
                <VueLogo
                    title="NativeScript"
                    :width="logoWidth"
                />
            </li>
            <li class="logo-list__item">
                <JSLogo
                    title="JavaScript"
                    :width="logoWidth"
                />
            </li>
            <li class="logo-list__item">
                <HTML5Logo
                    title="HTML5"
                    :width="logoWidth"
                />
            </li>
            <li class="logo-list__item">
                <WPLogo
                    title="WordPress"
                    :width="logoWidth"
                />
            </li>
            <li class="logo-list__item">
                <SASSLogo
                    title="SASS"
                    :width="logoWidth"
                />
            </li>
        </ul>
    </div>
</template>
<script>

// Tech logos
import NSLogo from "~/assets/images/logos/ns.svg"
import VueLogo from "~/assets/images/logos/vue.svg"
import JSLogo from "~/assets/images/logos/js.svg"
import HTML5Logo from "~/assets/images/logos/html5.svg"
import WPLogo from "~/assets/images/logos/wordpress.svg"
import SASSLogo from "~/assets/images/logos/sass.svg"

export default {
    components: {
        NSLogo,
        VueLogo,
        JSLogo,
        HTML5Logo,
        WPLogo,
        SASSLogo
    },
    props: {
        logos: {
            type: String,
            default: ''
        },
        orientation: {
            type: String,
            default: "horizontal"
        },
        align: {
            type: String,
            default: "center"
        },
        logoWidth: {
            type: String,
            default: "100"
        },
        logoColor: {
            type: String,
            default: "gray"
        },
        logoColorHover: {
            type: String,
            default: "gray-dark"
        },
        imageKey: {
            type: String,
            default: "image"
        },
        titleKey: {
            type: String,
            default: "name"
        },
        link: {
            type: Boolean,
            default: false
        },
        linkKey: {
            type: String,
            default: ""
        },
        breakpoint: {
            type: String,
            default: "sm"
        }
    },
    computed: {
        listClass() {
            let baseClass = "logo-list"
            let orientationClass = ` logo-list__${this.orientation}`
            let alignClass = ` logo-list__${this.align}`
            let linkClass = this.link ? ` logo-list__has-link` : ""

            if (this.breakpoint != "sm") {
                alignClass = `${alignClass}--${this.breakpoint}`
            }

            return `${baseClass}${orientationClass}${alignClass}`
        }
    },
    methods: {
        visitLogo(logo) {
            if (this.link) {
                window.open = logo[this.linkKey]
            }
        }
    }
}
</script>

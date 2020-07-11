<template>
    <div v-if="logos" class="logo-list__wrapper">
        <ul v-if="logos == 'tech'" :class="listClass">
            <li 
                v-for="(logo, i) in techLogos"
                :key="`tech-logo-${i}`"
                class="logo-list__item"
            >
                <div
                    :v-html="loadLogo(logo.logo)"
                    :title="logo.name"
                />
            </li>
        </ul>
    </div>
</template>
<script>

export default {
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
        techLogos() {
            return [
                {
                    name: 'NativeScript',
                    logo: 'ns'
                },
                {
                    name: 'Vue JS',
                    logo: 'vue'
                },
                {
                    name: 'JavaScript',
                    logo: 'js'
                },
                {
                    name: 'HTML5',
                    logo: 'html5'
                },
                {
                    name: 'WordPress',
                    logo: 'wordpress'
                },
                {
                    name: 'SASS',
                    logo: 'sass'
                }
            ]
        },
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
        },
        loadLogo(logo) {
            return require(`@/assets/images/logos/${logo}.svg?include`)
        }
    }
}
</script>

<template>
    <header :class="`header__main header__${scrollClass}`">   
        <b-container fluid v-if="theme == 'default'" class="d-flex align-items-center pr-0">
            <back-button/>
            <nuxt-link 
                to="/"
                class="header__brand--wrapper d-inline-flex align-items-center"
            >
                <brand class="header__brand--logo mr-0 mr-md-2"/>
            </nuxt-link>
            <app-menu location="header" class="mr-auto"/>
            <div class="ml-auto d-flex align-items-center">
                <lang-switch class="mr-2"/>
                <scheme-switch location="header" class="mr-2"/>
                <b-button
                    class="header__menu"
                    variant="link"
                    @click="$root.$emit('openMenu')"
                >
                    <i class="bx bx-menu-alt-right"></i>
                </b-button>
            </div>
        </b-container>
        <b-container v-else class="d-flex align-items-center justify-content-center">
            <nuxt-link
                to="/"
                class="header__bran--wrapper d-inline-flex align-items-center"
            >
                <b-img
                    src="~/assets/images/logo.svg"
                    class="header__brand--logo mx-auto"
                />
            </nuxt-link>
        </b-container>
    </header>
</template>
<script>
import BackButton from '~/components/BackButton'
export default {
    components: {
        BackButton
    },
    props: {
        theme: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            scrollClass: 'normal',
            alwaysMenu: false
        }
    },
    methods: {
        onScroll() {
            this.scrollClass = window.scrollY > 100 ? 'fixed' : 'normal'
            if (this.scrollClass == 'fixed') {
                this.$root.$emit('hideMenu', false)
            } else {
                this.$root.$emit('hideMenu', true)
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    destroy() {
        window.removeEventListener('scroll', this.onScroll)
    }
}
</script>

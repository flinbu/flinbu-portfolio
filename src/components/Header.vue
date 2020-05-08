<template>
    <header :class="`header__main header__${scrollClass}`">   
        <b-container fluid v-if="theme == 'default'" class="d-flex align-items-center pr-0">
            <g-link 
                :to="$tp('/', $i18n.locale.toString(), true)"
                class="header__brand--wrapper d-inline-flex align-items-center"
            >
                <brand class="header__brand--logo mr-0 mr-md-2"/>
            </g-link>
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
            <g-link
                to="/"
                class="header__bran--wrapper d-inline-flex align-items-center"
            >
                <g-image
                    src="~/assets/images/logo.svg"
                    class="header__brand--logo mx-auto"
                />
            </g-link>
        </b-container>
    </header>
</template>
<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            scrollClass: 'normal'
        }
    },
    methods: {
        onScroll() {
            this.scrollClass = window.scrollY > 100 ? 'fixed' : 'normal'
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
<static-query>
    query {
        metadata {
            siteName,
            siteDescription
        }
    }
</static-query>

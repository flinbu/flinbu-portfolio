<template>
    <footer class="footer footer__main py-6">
        <b-col cols="12" md="10" offset-lg="1">
            <b-row align-v="center">
                
                <!-- Brand -->
                <b-col cols="12" md="6">
                    <b-row align-v="center" class="justify-content-center justify-content-md-start">
                        <b-col class="footer__logo--wrapper mb-4 text-center text-md-left" cols="4" md="2" offset-md="0">
                            <g-image
                                src="~/assets/images/logo.svg"
                                class="footer__logo img-fluid"
                            />
                        </b-col>
                        <b-col cols="12" md="10" class="text-center text-md-left">
                            <h1 class="header__brand--name mr-2">{{ $static.metadata.siteName }}</h1>
                            <p class="header__brand--description mt-1 mb-3">{{ $static.metadata.siteDescription }}</p>
                            <div class="footer__copyright">
                                <a class="mb-1" :href="`mailto:${email}`">{{ email }}</a>
                                <p v-html="copyright" class="mb-0"/>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>

                <!-- Social -->
                <b-col class="d-none d-md-flex flex-column text-center text-md-right" cols="12" md="6">
                    <social-menu class="footer__social justify-content-center justify-content-md-end" iconSize="md"/>
                    <p class="sources" v-html="$t('footer.question', {xd_url: xd_url, code_url: code_url})"/>
                </b-col>

            </b-row>
        </b-col>
    </footer>
</template>
<static-query>
    query {
        metadata {
            siteName,
            siteDescription
        }
    }
</static-query>
<script>
const YEAR = new Date().getFullYear()
export default {
    data() {
        return {
            copyright: this.$t('site.copyright', {year: YEAR}),
            email: "me@flinbu.co",
            xd_url: 'https://dribbble.com/shots/11097348-Personal-website-flinbu-co',
            code_url: 'https://gitlab.com/flinbu-dev/portfolio'
        }
    }
}
</script>

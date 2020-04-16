<template>
    <footer class="footer footer__main py-6">
        <b-col cols="12" md="10" offset-lg="1" xl="8" offset-xl="2">
            <b-row align-v="center">
                
                <!-- Brand -->
                <b-col cols="12" md="6">
                    <b-row align-v="center">
                        <b-col class="footer__logo--wrapper" cols="3">
                            <g-image
                                src="~/assets/images/logo.svg"
                                class="footer__logo img-fluid"
                            />
                        </b-col>
                        <b-col cols="8">
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
                <b-col class="d-none d-md-block" cols="12" md="6">
                    <b-row class="justify-content-start justify-content-md-end">
                        <social-menu class="footer__social" location="footer"/>
                    </b-row>
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
            menu: [
                {
                    label: "Request CV",
                    type: "external",
                    target: "https://forms.gle/VPNkTfKm1wZiUntP9"
                },
                {
                    label: "Hire me",
                    type: "external",
                    target: "https://forms.gle/NS1fLSukVBWzYw8K7",
                }
            ],
            copyright: `&copy; ${YEAR}`,
            email: "me@flinbu.co"
        }
    }
}
</script>

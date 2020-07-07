<template>
    <b-container fluid class="module module__frontend content content__middle">
        <b-row>
            <b-container fluid class="module__wrapper">
                <b-row class="module__content" align-v="center">
                    <b-col class="module__data order-2 order-md-1 mb-5 mb-md-0" cols="12" md="5" offset-md="1">
                        <module-title
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                            :supText="labels.subtitle"
                        />
                        <div class="module__description mb-5" v-html="labels.description"/>
                        <button-group
                            class="module__action d-flex align-items-center flex-wrap mb-6"
                            :buttons="buttons"
                            button-class="module__action"
                        />
                        <logo-list
                            logos="tech"
                            align="left" 
                            logo-width="30"
                            breakpoint="lg"
                        />
                    </b-col>
                    <b-col class="module__image--wrapper mb-6 mb-lg-0 order-1 order-md-2 mb-5 mb-md-0" cols="12" md="6">
                        <b-row>
                            <b-img-lazy 
                                src="~/assets/images/front-dev@2x.png" 
                                class="module__image module__image--front-dev img-fluid"
                            />
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            buttons: [
                {
                    type: "anchor",
                    label: this.$t('pages.home.front_dev_button_main'),
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: 'link',
                    label: this.$t('pages.home.front_dev_button_second'),
                    target: 'https://gitlab.com/flinbu-dev/portfolio',
                    theme: 'white',
                    shadow: true
                }
            ],
            scheme: 'light'
        }
    },
    computed: {
        labels() {
            return {
                title: this.$t('pages.home.front_dev_title').split(' '),
                subtitle: this.$t('pages.home.front_dev_subtitle'),
                description: this.$t('pages.home.front_dev_description')
            }
        }
    },
    mounted() {
        let schemeCookie = this.$cookies.get('color-scheme')
        this.scheme = schemeCookie ? schemeCookie : 'light'
        this.$root.$on('scheme', scheme => {
            this.scheme = scheme
        })
    }
}
</script>

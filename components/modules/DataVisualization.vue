<template>
    <b-container fluid class="module module__data content content__middle">
        <b-row>
            <b-container fluid class="module__wrapper">
                <b-row class="module__content" align-v="center">
                    <b-col class="module__data order-2 pl-md-5 mb-5 mb-md-0" cols="12" md="5">
                        <module-title
                            :strongText="labels.title[0]"
                            :lightText="labels.title[1]"
                            :supText="labels.subtitle"
                        />
                        <div class="module__description mb-5" v-html="labels.description"/>
                        <button-group
                            class="module__action d-flex align-items-center flex-wrap"
                            :buttons="buttons"
                            button-class="module__action"
                        />
                    </b-col>
                    <b-col 
                        class="module__image--wrapper order-1 mb-5 mb-md-0 pl-0 pr-0"
                        cols="12"
                        md="6"
                    >   
                        <b-img-lazy
                            class="module__image img-fluid"
                            src="~/assets/images/gota-gota@2x.jpg"
                            blank-src="~/assets/images/gota-gota@2x.jpg?lqip"
                        />
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
                    label: this.$t('pages.home.data_button_main'),
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: 'external',
                    label: this.$t('pages.home.data_button_second'),
                    target: 'https://www.elpais.com.co/especiales/gota-gota-america-latina/colombianos2/index.html#/',
                    theme: 'white',
                    shadow: true
                }
            ]
        }
    },
    computed: {
        labels() {
            return {
                title: this.$t('pages.home.data_title').split(' '),
                subtitle: this.$t('pages.home.data_subtitle'),
                description: this.$t('pages.home.data_description')
            }
        }
    }
}
</script>

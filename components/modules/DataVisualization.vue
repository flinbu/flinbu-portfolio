<template>
    <b-container fluid class="module module__data content content__middle py-2 py-md-6">
        <b-row class="w-md-100">
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
                        class="module__image--wrapper order-1 mb-5 mb-md-0"
                        cols="12"
                        md="6"
                    >   
                        <lazy-image
                            customClass="module__image img-fluid w-100"
                            :src="home_content.data_visualization.image"
                        />
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
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
        ...mapGetters({
            home_content: 'home_content'
        }),
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

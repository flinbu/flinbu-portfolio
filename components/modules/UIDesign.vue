<template>
    <b-container fluid class="module module__ui content content__middle">
        <b-container fluid class="module__wrapper px-0">
            <b-row class="module__content" align-v="center">
                <b-col class="module__data order-2 order-md-1 mb-5 mb-md-0" cols="12" md="5" offset-xl="1">
                    <module-title
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        :supText="labels.subtitle"
                    />
                    <div class="module__description mb-5" v-html="labels.description"/>
                    <button-group
                        class="module__action d-flex align-items-center justify-content-center justify-content-md-start flex-wrap"
                        :buttons="buttons"
                        button-class="module__action"
                    />
                </b-col>
                <b-col class="module__image--wrapper order-1 order-md-2 mb-5 mb-md-0" cols="12" md="6">
                    <b-row>
                        <image-slider 
                            :items="images"
                            ratio="4x3"
                            indicators
                            controls
                            :infinite-scroll="true"
                            :interval="2000"
                            :play-speed="1000"
                            caption
                            lazy
                        />
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<script>
import axios from 'axios'
export default {
    computed: {
        labels() {
            let title = this.$t('pages.home.ux_design_title').split(' ')
            return {
                title: title,
                subtitle: this.$t('pages.home.ux_design_subtitle'),
                description: this.$t('pages.home.ux_design_description')
            }
        },
        buttons() {
            return [
                {
                    type: "anchor",
                    label: this.$t('pages.home.ux_design_button_main'),
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "link",
                    label: this.$t('pages.home.ux_design_button_second'),
                    target: '/portfolio',
                    theme: "white",
                    shadow: true
                }
            ]
        },
        images() {
            return this.$store.state.portfolio.items
        }
    }
}
</script>
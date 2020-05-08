<template>
    <div class="module module__hero content content__middl pt-6 pt-md-3 pb-6">
        <b-container>
            <b-row class="h-100" align-v="center">
                <b-col cols="12" lg="6" order="2" order-lg="1">
                    <module-title
                        tag="h1"
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                    />
                    <p class="module__subtitle">{{ labels.subtitle }}</p>
                    <div class="divider mb-5"/>
                    <div class="module__description mb-5" v-html="labels.description"/>
                    <button-group
                        class="module__actions d-flex align-items-center justify-content-flex-start flex-wrap"
                        :buttons="buttons"
                        button-class="module__action"
                    />
                </b-col>
                <b-col cols="12" lg="6" class="text-center mb-3 mb-lg-0" order="1" order-lg="2">
                    <g-image
                        class="img-fluid"
                        src="~/assets/images/flinbu.png"
                        quality="100"
                        width="500"
                    />
                    <social-menu 
                        class="module__hero--social"
                        icon-size="lg"
                        alignment="center"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    computed: {
        labels() {
            let title = this.$t('site.title').split(' ')
            return {
                title: title,
                subtitle: this.$t('site.subtitle'),
                description: this.$t('pages.home.hero_description')
            }
        },
        buttons() {
            return [
                {
                    type: "anchor",
                    label: this.$t('pages.home.hero_button_main'),
                    target: "#contact",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "link",
                    label: this.$t('pages.home.hero_button_second'),
                    target: process.env.GRIDSOME_RESUME_URL,
                    theme: "white",
                    color: "red",
                    shadow: true
                }
            ]
        }
    }
}
</script>

<template>
    <div class="module module__hero content content__middl pt-6 pt-md-3 pb-6">
        <b-container>
            <b-row class="h-100" align-v="center">
                <b-col cols="12" lg="6" order="2" order-lg="1">
                    <module-title
                        tag="h1"
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        title-class="justify-content-center justify-content-md-start"
                    />
                    <p class="module__subtitle text-center text-md-left">{{ labels.subtitle }}</p>
                    <div class="divider mx-auto mr-md-auto ml-md-0 mb-3"/>
                    <h3 class="module__copyline text-center text-md-left mb-3">{{ $t('site.copyline') }}</h3>
                    <div class="module__description text-center text-md-left mb-5" v-html="labels.description"/>
                    <button-group
                        class="module__actions d-flex align-items-center justify-content-center justify-content-md-start flex-wrap"
                        :buttons="buttons"
                        button-class="module__action"
                    />
                </b-col>
                <b-col cols="12" lg="6" class="text-center mb-3 mb-lg-0" order="1" order-lg="2">
                    <lazy-image
                        customClass="img-fluid module__hero--avatar"
                        :src="require('~/assets/images/avatar@2x.png')"
                        :placeholder="require('~/assets/images/avatar.png?lqip')"
                        width="800"
                    />
                    <!-- <b-img-lazy
                        class="img-fluid module__hero--avatar"
                        src="~/assets/images/avatar@2x.png"
                        blank-src="~/assets/images/avatar.png?lqip"
                        width="800"
                    /> -->
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
                    type: "external",
                    label: this.$t('pages.home.hero_button_second'),
                    target: process.env.RESUME_URL,
                    theme: "white",
                    color: "red",
                    shadow: true
                }
            ]
        }
    }
}
</script>

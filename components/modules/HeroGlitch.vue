<template>
    <div class="module module__hero content h-md-100 pt-0 pb-0">
        <b-container fluid>
            <b-row class="h-100" align-v="center">
                <glitch-image
                    :src="require('~/assets/images/flinbu-poster.jpg')"
                    :src-mobile="require('~/assets/images/flinbu-poster-mobile.jpg')"
                    :src-dark="require('~/assets/images/flinbu-poster-dark.jpg')"
                    :src-dark-mobile="require('~/assets/images/flinbu-poster-dark-mobile.jpg')"
                    :slices="4"
                    :alt="$t('site.title')"
                />
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

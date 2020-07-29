<template>
    <div class="module module__hero module__hero--v2 content content__middl pt-6 pt-md-3 pb-6 mb-6 mb-md-4">
        <img :src="moduleBackground" class="module__hero--v2__background"/>
        <b-container class="module__hero--v2__content">
            <b-row class="module__hero--v2__row" align-v="end" align-h="center">
                <b-col cols="12">
                    <module-title
                        tag="h1"
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        title-class="module__title justify-content-center"
                    />
                    <p class="module__subtitle text-center">{{ labels.subtitle }}</p>
                    <social-menu 
                        class="module__hero--social"
                        icon-size="lg"
                        alignment="center"
                    />
                    <button-group
                        v-if="!hideButtons"
                        class="module__actions d-flex align-items-center justify-content-center flex-wrap not-variable"
                        :buttons="buttons"
                        button-class="module__action"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'
const mainAnaglyph = require('~/assets/images/anaglyph.jpg')
const anaglyphs = [
    require('~/assets/images/anaglyph-1.jpg'),
    require('~/assets/images/anaglyph-2.jpg'),
    require('~/assets/images/anaglyph-3.jpg'),
    require('~/assets/images/anaglyph-4.jpg'),
    require('~/assets/images/anaglyph-5.jpg'),
    require('~/assets/images/anaglyph-6.jpg'),
    require('~/assets/images/anaglyph-7.jpg'),
    require('~/assets/images/anaglyph-8.jpg'),
    require('~/assets/images/anaglyph-9.jpg'),
    require('~/assets/images/anaglyph-10.jpg')
]
export default {
    props: {
        hideButtons: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            moduleBackground: ''
        }
    },
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
                    type: "link",
                    label: this.$t('pages.home.hero_button_main'),
                    target: "/about",
                    theme: "main",
                    shadow: true
                },
                {
                    type: "link",
                    label: this.$t('pages.home.hero_button_second'),
                    target: '/portfolio',
                    theme: "white",
                    color: "red",
                    shadow: true
                }
            ]
        }
    },
    methods: {
        setBackground() {
            let intervalTime = Math.round(Math.random() * (10000 - 3000)) + 3000
            setTimeout(() => {
                console.log('Changing hero BG...')
                this.moduleBackground = anaglyphs[Math.floor(Math.random() * anaglyphs.length)]
                setTimeout(() => {
                    this.moduleBackground = mainAnaglyph
                }, Math.round(Math.random() * (2000 - 500)) + 500)
                this.setBackground()
            }, intervalTime)
        }
    },
    mounted() {
        this.moduleBackground = mainAnaglyph
        this.setBackground()
    }
}
</script>

<template>
  <div class="app__about">
    <div class="module module__hero content h-md-100 pt-0 pb-0">
        <b-container fluid>
            <b-row class="h-md-100 pt-0 pb-6 py-md-8" align-v="start">
                <glitch-image
                    :src="require('~/assets/images/flinbu-poster.jpg')"
                    :src-mobile="require('~/assets/images/flinbu-poster-mobile.jpg')"
                    :src-dark="require('~/assets/images/flinbu-poster-dark.jpg')"
                    :src-dark-mobile="require('~/assets/images/flinbu-poster-dark-mobile.jpg')"
                    :slices="3"
                    :alt="$t('site.title')"
                    class="about__image"
                />
                <b-col
                  cols="12"
                  md="6"
                  offset-md="6"
                  lg="5"
                  offset-lg="7"
                  class="about__content"
                >
                  <div class="mb-6 about__hello">
                    <div class="about__title--emoji">🖖</div>
                    <h2 class="about__title mb-4">{{ $t('pages.about.title') }}</h2>
                    <div class="about__section--content" v-html="$t('pages.about.bio.content')"/>
                  </div>

                  <!-- Skills -->
                  <div class="about__section">
                    <h3 class="about__section--title">{{ $t('pages.about.skills.title') }}</h3>
                    <ul class="about__skills">
                      <li v-for="skill in 8" :key="`skill-${skill}`">{{ $t(`pages.about.skills.options.${skill}`) }}</li>
                    </ul>
                  </div>

                  <!-- More -->
                  <div class="about__section">
                    <h3 class="about__section--title">{{ $t('pages.about.more') }}</h3>
                    <button-group
                        class="about__section--buttons d-flex align-items-center justify-content-start flex-wrap"
                        :buttons="buttons"
                        button-class="mb-5"
                    />
                  </div>

                  <!-- CTA -->
                  <h3 class="about__cta" @click="contact" v-html="$t('pages.about.contact')"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
  </div>
</template>
<script>

// Modules
import HeroGlitch from '~/components/modules/HeroGlitch'
import UXDesign from '~/components/modules/UIDesign'
import DataVisualization from '~/components/modules/DataVisualization'
import FrontendDevelopment from '~/components/modules/FrontendDevelopment'
import CreationProcess from '~/components/modules/CreationProccess'
import Contact from '~/components/modules/Contact'

export default {
  hideFooter: true,
  components: {
    HeroGlitch
  },
  computed: {
    buttons() {
      return [
        {
          type: 'modal',
          label: this.$t('pages.portfolio.creation_process'),
          target: 'showProcess',
          theme: 'main',
          shadow: false
        },
        {
          type: 'link',
          label: this.$t('pages.about.work'),
          target: '/portfolio',
          theme: 'main',
          shadow: false
        },
        {
            type: "external",
            label: this.$t('pages.about.resume'),
            target: process.env.RESUME_URL,
            theme: "white",
            color: "red",
            shadow: false
        }
      ]
    }
  },
  methods: {
    contact() {
      this.$root.$emit('showContact')
    }
  }
}

</script>
<template>
  <div class="app__about">
    <div class="module module__hero content h-md-100 pt-0 pb-0">
        <b-container fluid>
            <b-row class="h-md-100 pt-0 pb-6 py-md-8" align-v="start">
                <b-col
                  cols="12"
                  md="6"
                  lg="7"
                  class="about__media--wrapper"
                >
                  <b-row>
                    <hero-2 hide-buttons class="about__media w-100" />
                  </b-row>
                </b-col>
                <b-col
                  cols="12"
                  md="6"
                  offset-md="6"
                  lg="5"
                  offset-lg="7"
                  class="about__content"
                >
                  <div class="mb-6 about__hello">
                    <div v-if="about.emoji" class="about__title--emoji">{{ about.emoji }}</div>
                    <h2 class="about__title mb-4" v-html="about.introduction"/>
                    <div class="about__section--content" v-html="about.content"/>
                  </div>

                  <!-- Skills -->
                  <div class="about__section mb-6">
                    <h3 class="about__section--title">{{ $t('pages.about.skills.title') }}</h3>
                    <ul class="about__skills">
                      <li v-for="(skill, i) in about.skills" :key="`skill-${i}`" v-html="skill"/>
                    </ul>
                  </div>

                  <!-- Experience -->
                  <div class="about__section mb-6">
                    <h3 class="about__section--title">{{ $t('pages.about.experience.title') }}</h3>
                    <timeline class="about__timeline" :timeline="experience" />
                  </div>

                  <!-- More -->
                  <div class="about__section">
                    <h3 class="about__section--title">{{ $t('pages.about.more') }}</h3>
                    <b-row align-v="stretch">
                      <b-col 
                        v-for="(button, i) in buttons"
                        :key="`button-${i}`"
                        class="about__more--wrapper"
                        cols="12" 
                        md="4"
                      >
                        <button class="about__more--button" @click="open(button.type, button.target)">
                          <img
                            v-if="button.image"
                            :src="require(`~/assets/images/${button.image}`)"
                            class="about__more--image"
                          />
                          <div class="about__more--icon-wrapper">
                            <icon
                              :name="button.icon"
                              size="md"
                              class="about__more--icon"
                            />
                          </div>
                          <span class="about__more--label">{{ button.label }}</span>
                        </button>
                      </b-col>
                    </b-row>
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

import { mapGetters, mapActions } from 'vuex'
import Hero2 from '~/components/modules/Hero2'
import Timeline from '~/components/Timeline'

const YEAR = new Date().getFullYear()

export default {
  hideFooter: true,
  components: {
    Hero2,
    Timeline
  },
  computed: {
    ...mapGetters({
      about: 'about'
    }),
    buttons() {
      return [
        {
          type: 'modal',
          label: this.$t('pages.about.process'),
          target: 'showProcess',
          icon: 'brain'
        },
        {
          type: 'link',
          label: this.$t('pages.about.work'),
          target: '/portfolio',
          icon: 'coffee'
        },
        {
            type: "external",
            label: this.$t('pages.about.resume'),
            target: this.resume,
            theme: "white",
            icon: 'briefcase-alt'
        }
      ]
    },
    experience() {
      if (!this.about) return false
      return this.about.experience.map( item => {
        return {
          title: item.title,
          company: item.company,
          description: item.description,
          date: `${item.year_from} ${item.year_to == 'current' ? YEAR : item.year_to}`
        }
      })
    },
    resume() {
      if (!this.about) return false
      return `${process.env.apiUrl}/assets/${this.about.resume}`
    }
  },
  methods: {
    ...mapActions({
      get_about: 'get_about'
    }),
    contact() {
      this.$root.$emit('showContact')
    },
    open(type, url) {
      switch (type) {
        case 'link':
          return this.$router.push(url)
        case 'external':
          return window.open(url)
        case 'modal':
          return this.$root.$emit(url)
      }
    }
  },
  async fetch() {
    if (!this.about) {
      this.$root.$emit('loading', true)
      await this.get_about()
      this.$root.$emit('loading', false)
    }
  }
}

</script>
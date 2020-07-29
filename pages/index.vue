<template>
  <div class="app__home">
    <Hero2 key="hero" id="hero"/>
    <UXDesign key="ux-design" id="ux-design"/>
    <DataVisualization key="data-visualization" id="data-visualization"/>
    <FrontendDevelopment key="frontend-development" id="frontend-development"/>
    <CreationProcessSlider key="creation-process" id="creation-process"/>
    <Contact key="contact" id="contact"/>
  </div>
</template>
<script>

// Modules
import Hero from '~/components/modules/Hero'
import Hero2 from '~/components/modules/Hero2'
import UXDesign from '~/components/modules/UIDesign'
import DataVisualization from '~/components/modules/DataVisualization'
import FrontendDevelopment from '~/components/modules/FrontendDevelopment'
import CreationProcess from '~/components/modules/CreationProccess'
import CreationProcessSlider from '~/components/modules/CreationProcessSlider'
import Contact from '~/components/modules/Contact'

export default {
  components: {
    Hero,
    Hero2,
    UXDesign,
    DataVisualization,
    FrontendDevelopment,
    CreationProcess,
    CreationProcessSlider,
    Contact
  },
  fetch() {
      if (!this.$store.state.contentful.fetched) this.$store.dispatch('contentful/fetch')
  }
}

</script>
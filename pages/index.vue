<template>
  <div class="app__home">
    <Hero key="hero" id="hero"/>
    <UXDesign key="ux-design" id="ux-design"/>
    <DataVisualization key="data-visualization" id="data-visualization"/>
    <FrontendDevelopment key="frontend-development" id="frontend-development"/>
    <CreationProcess key="creation-process" id="creation-process"/>
    <Contact key="contact" id="contact"/>
  </div>
</template>
<script>

// Modules
import Hero from '~/components/modules/Hero'
import UXDesign from '~/components/modules/UIDesign'
import DataVisualization from '~/components/modules/DataVisualization'
import FrontendDevelopment from '~/components/modules/FrontendDevelopment'
import CreationProcess from '~/components/modules/CreationProccess'
import Contact from '~/components/modules/Contact'

export default {
  components: {
    Hero,
    UXDesign,
    DataVisualization,
    FrontendDevelopment,
    CreationProcess,
    Contact
  }
}

</script>
<template>
  <div class="app__home">
    <HeroGlitch key="hero" id="hero"/>
    <UXDesign key="ux-design" id="ux-design"/>
    <DataVisualization key="data-visualization" id="data-visualization"/>
    <FrontendDevelopment key="frontend-development" id="frontend-development"/>
    <CreationProcess key="creation-process" id="creation-process"/>
    <Contact key="contact" id="contact"/>
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
  components: {
    HeroGlitch,
    UXDesign,
    DataVisualization,
    FrontendDevelopment,
    CreationProcess,
    Contact
  }
}

</script>
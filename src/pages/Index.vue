<template>
  <Layout>
    <transition-group name="fade" appear> 
      <Hero key="hero"/>
      <UIDesign key="ui-design"/>
      <DataVisualization key="data-visualization"/>
      <FrontendDevelopment key="frontend-development"/>
      <CreationProccess key="creation-proccess"/>
      <Contact key="contact"/>
    </transition-group>
  </Layout>
</template>
<script>
export default {
  metaInfo: {
    title: `${process.env.GRIDSOME_SITE_NAME} - ${process.env.GRIDSOME_SITE_DESCRIPTION}`
  }
}
</script>
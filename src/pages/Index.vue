<template>
  <Layout>
    <transition-group name="fade" appear> 
      <Hero 
        key="hero"
        id="hero"
      />
      <UIDesign 
        key="ux-design"
        id="ux-design"
      />
      <DataVisualization 
        key="data-visualization"
        id="data-visualization"
      />
      <FrontendDevelopment 
        key="frontend-development"
        id="frontend-development"
      />
      <CreationProccess 
        key="creation-process"
        id="creation-process"
      />
      <Contact 
        key="contact"
        id="contact"
      />
    </transition-group>
  </Layout>
</template>
<script>
export default {
  metaInfo: {
    title: `${process.env.GRIDSOME_SITE_DESCRIPTION}`
  }
}
</script>
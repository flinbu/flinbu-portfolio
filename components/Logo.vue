<template>
  <div :class="`app-logo app-logo__${scheme}`">
    <b-img
      v-if="scheme == 'normal'"
      src="~/assets/images/logo.svg"
      class="app-logo__img"
    />
    <b-img
      v-else-if="scheme == 'light'"
      src="~/assets/images/logo-light.svg"
      class="app-logo__img"
    />
    <b-img
      v-else-if="scheme == 'dark'"
      src="~/assets/images/logo-dark.svg"
      class="app-logo__img"
    />
  </div>
</template>
<script>
export default {
  props: {
    scheme: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

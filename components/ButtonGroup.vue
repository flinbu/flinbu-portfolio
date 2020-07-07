<template>
    <div v-if="buttons" class="button-group">
        <app-button
            v-for="(button, index) in buttons"
            :key="index"
            :type="button.type"
            :label="button.label"
            :target="button.target"
            :theme="button.theme"
            :color="button.color"
            :shadow="button.shadow"
            :icon="button.icon"
            :icon-type="button.iconType"
            :icon-size="button.iconSize"
            :icon-rotate="button.iconRotate"
            :icon-flip="button.iconFlip"
            :icon-pos="button.iconPos"
            :icon-animation="button.iconAnimation"
            :icon-animation-on-hover="button.iconAnimationOnHover"
            class="mb-3 mb-md-0 mr-3"
        />
    </div>
</template>
<script>
export default {
    props: {
        buttons: {
            type: [Array, Boolean],
            default: false
        },
        buttonClass: {
            type: String,
            default: ""
        }
    }
}
</script>

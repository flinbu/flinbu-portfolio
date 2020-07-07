<template>
    <span class="app-button__content">
        <icon
            v-if="icon"
            class="app-button__icon"
            :name="icon"
            :type="iconType"
            :size="iconSize"
            :rotate="iconRotate"
            :flip="iconFlip"
            :animation="iconAnimation"
            :animation-on-hover="iconAnimationOnHover"
        />

        <span 
            v-if="label"
            :class="labelClass"
            v-html="label"
        />
    </span>
</template>
<script>
export default {
    props: {
        label: {
            type: [String, Boolean],
            default: false
        },
        icon: {
            type: [String, Boolean],
            default: false
        },
        iconType: {
            type: [String, Boolean],
            default: false
        },
        iconSize: {
            type: [String, Boolean],
            default: false
        },
        iconRotate: {
            type: [String, Boolean],
            default: false
        },
        iconFlip: {
            type: [String, Boolean],
            default: false
        },
        iconPos: {
            type: [String, Boolean],
            default: "left"
        },
        iconAnimation: {
            type: [String, Boolean],
            default: false
        },
        iconAnimationOnHover: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        labelClass() {
            let baseClass = "app-button__label"
            let iconClass = this.icon ? ` app-button__label--icon-${this.iconPos}` : ''

            return `${baseClass}${iconClass}`
        }
    }
}
</script>

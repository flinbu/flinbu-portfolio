<template>
    <div>
        <g-link
            v-if="type == 'link'"
            :to="target"
            :class="buttonClasses"
        >
            <button-content
                :label="label"
                :icon="icon"
                :icon-type="iconType"
                :icon-size="iconSize"
                :icon-rotate="iconRotate"
                :icon-flip="iconFlip"
                :icon-animation="iconAnimation"
                :icon-animation-on-hover="iconAnimationOnHover"
            />
        </g-link>
        <a 
            v-if="type == 'external'"
            :class="buttonClasses"
            :href="target"
            target="_blank">
            <button-content
                :label="label"
                :icon="icon"
                :icon-type="iconType"
                :icon-size="iconSize"
                :icon-rotate="iconRotate"
                :icon-flip="iconFlip"
                :icon-animation="iconAnimation"
                :icon-animation-on-hover="iconAnimationOnHover"
            />
        </a>
        <a 
            v-if="type == 'modal'"
            :class="buttonClasses"
            @click="openModal(target)"
        >
            <button-content
                :label="label"
                :icon="icon"
                :icon-type="iconType"
                :icon-size="iconSize"
                :icon-rotate="iconRotate"
                :icon-flip="iconFlip"
                :icon-animation="iconAnimation"
                :icon-animation-on-hover="iconAnimationOnHover"
            />
        </a>
        <a 
            v-if="type == 'anchor'"
            :class="buttonClasses"
            @click="doAnchor(target)"
        >
            <button-content
                :label="label"
                :icon="icon"
                :icon-type="iconType"
                :icon-size="iconSize"
                :icon-rotate="iconRotate"
                :icon-flip="iconFlip"
                :icon-animation="iconAnimation"
                :icon-animation-on-hover="iconAnimationOnHover"
            />
        </a>
    </div>
</template>
<script>
import ButtonContent from "~/components/ButtonContent"
export default {
    props: {
        type: {
            type: [String, Boolean],
            default: "link"
        },
        label: {
            type: [String, Boolean],
            default: false
        },
        target: {
            type: [String, Boolean],
            required: true
        },
        theme: {
            type: [String, Boolean],
            default: "default"
        },
        color: {
            type: [String, Boolean],
            default: "red"
        },
        shadow: {
            type: Boolean,
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
    components: {
        ButtonContent
    },
    computed: {
        buttonClasses() {
            let baseClass = "app-button"
            let typeClass = ` app-button__${this.type}`
            let themeClass = ` app-button__${this.theme}`
            let colorClass = this.theme == 'text' ? ` app-button__text--${this.color}` : ''
            let iconClass = this.icon ? ` app-button__has-icon app-button__icon-${this.iconPos}` : ''
            let shadowClass = this.shadow ? ' app-button__has-shadow' : ''

            return `${baseClass}${typeClass}${themeClass}${colorClass}${iconClass}${shadowClass}`
        },
        labelClass() {
            let baseClass = "app-button__label"
            let iconClass = this.icon ? ` app-button__label--icon-${this.iconPos}` : ''

            return `${baseClass}${iconClass}`
        }
    },
    methods: {
        openModal(modal) {
            this.$root.$emit(modal, true)
        },
        doAnchor(anchor) {
            this.$scrollTo(anchor, 1000, {
                offset: -100
            })
        }
    }
}
</script>
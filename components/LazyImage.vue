<template>
    <b-overlay
        :show="overlay"
        spinner-variant="primary"
        spinner-type="grow"
        spinner-small
        variant="transparent"
        blur="20px"
        opacity="1"
        :rounded="rounded"
    >
        <b-img-lazy
            :src="src"
            :blank-src="placeholder ? placeholder : ''"
            :fluid="fluid"
            :fluid-grow="fluidGrow"
            :block="block"
            :thumbnail="thumbnail"
            :left="left"
            :right="right"
            :center="center"
            :offset="offset"
            :class="`lazy-image ${customClass}`"
            :data-type="type"
            ref="image"
            v-on:update:show="showImage()"
        />
    </b-overlay>
</template>
<script>
export default {
    props: {
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        customClass: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        fluid: {
            type: Boolean,
            default: false
        },
        fluidGrow: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        thumbnail: {
            type: Boolean,
            default: false
        },
        left: {
            type: Boolean,
            default: false
        },
        right: {
            type: Boolean,
            default: false
        },
        center: {
            type: Boolean,
            default: false
        },
        offset: {
            type: [Number, String],
            default: 360
        },
        rounded: {
            type: [String, Boolean],
            default: false
        }
    },
    data() {
        return {
            overlay: true
        }
    },
    methods: {
        showImage() {
            setTimeout(() => this.overlay = false, 2000)
        }
    }
}
</script>
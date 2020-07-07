<template>
    <div v-if="show" :class="`module__title--wrapper module__title--${size}`">
        <small class="module__title--sup" v-if="supText" v-html="supText"/>
        <h1 v-if="tag == 'h1'" :class="`module__title ${titleClass}`">
            <strong v-if="strongText" v-html="strongText"/>
            <span v-if="lightText" v-html="lightText"/>
        </h1>
        <h2 v-else :class="`module__title justify-content-${justify}`">
            <strong v-if="strongText" v-html="strongText"/>
            <span v-if="lightText" v-html="lightText"/>
        </h2>
    </div>
</template>
<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'h2'
        },
        strongText: {
            type: String,
            default: ''
        },
        lightText: {
            type: String,
            default: ''
        },
        supText: {
            type: String,
            default: ''
        },
        justify: {
            type: String,
            default: 'start'
        },
        size: {
            type: String,
            default: 'lg'
        },
        titleClass: {
            type: String,
            default: 'justify-content-start'
        }
    },
    computed: {
        show() {
            return this.strongText || this.lightText
        }
    }
}
</script>
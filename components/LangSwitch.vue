<template>
    <b-dropdown 
        class="lang-switch"
        :text="$t(`components.lang_switch.${language}`)"
        lazy
    >
        <b-dropdown-item
            v-for="lang in languages"
            :key="lang"
            :active="lang == language"
            @click="changeLanguage(lang)"
        >{{ $t(`components.lang_switch.${lang}`) }}</b-dropdown-item>
    </b-dropdown>
</template>
<script>
export default {
    data() {
        return {
            language: this.$i18n.locale.toString(),
            languages: this.$i18n.availableLocales
        }
    },
    methods: {
        changeLanguage(lang) {
            this.$i18n.locale = lang
            this.language = lang
            if (process.client) {
                this.$cookies.set('lang', lang)
            }
        }
    }
}
</script>
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
            if (lang != this.language) {
                this.language = lang
                this.$router.push({
                    path: this.$tp(this.$route.path, lang, true)
                })
            }
        }
    }
}
</script>
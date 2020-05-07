<template>
    <b-container fluid class="module module__creation content content__middle py-6 py-lg-10">
        <b-container class="module__wrapper px-0">
            <b-row class="module__content">
                <b-col class="module__data" cols="12" xl="10" offset-xl="1">
                    <module-title
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        :supText="labels.subtitle"
                        justify="center"
                        class="text-center mb-5 mb-md-7"
                    />
                    <b-row class="creation-proccess__wrapper" align-v="stretch">
                        <b-col v-for="(step, index) in process" :key="index" class="creation-proccess__step" cols="12" md="6" lg="4">
                            <div class="creation-proccess__content">
                                <h3 class="creation-proccess__title">
                                    <span class="creation-proccess__title--step">{{ index + 1 }}</span>
                                    {{ $t(`pages.home.process_${step}`) }}
                                </h3>
                                <div class="creation-proccess__description" v-html="$t(`pages.home.process_${step}_desc`)"/>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            process: [
                'research',
                'design',
                'prototype',
                'improve',
                'deploy',
                'support'
            ]
        }
    },
    computed: {
        labels() {
            return {
                title: this.$t('pages.home.process_title').split(' '),
                subtitle: this.$t('pages.home.process_subtitle')
            }
        }
    }
}
</script>

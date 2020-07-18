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
                    <b-row class="creation-process__wrapper" align-v="stretch" align-h="center">
                        <b-col 
                            v-for="(step, index) in steps" 
                            :key="index" class="creation-process__step" 
                            cols="12" 
                            md="6" 
                            lg="4" 
                            xl="3"
                            @click="openStep(index)"
                        >
                            <div class="creation-process__content">
                                <span class="creation-process__number">{{ index + 1 }}</span>
                                <icon
                                    v-if="step.icon"
                                    :name="step.icon"
                                    class="creation-process__icon"
                                />
                                <h3 class="creation-process__title">
                                    {{ step.title }}
                                </h3>
                                <!-- <div class="creation-process__description" v-html="$t(`pages.home.process_${step}_desc`)"/> -->
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
    computed: {
        steps() {
            return [
                {
                    icon: 'paperclip',
                    title: this.$t('pages.creation_process.brief.title'),
                    desc: this.$t('pages.creation_process.brief.desc'),
                    assets: 2
                },
                {
                    icon: 'planet',
                    title: this.$t('pages.creation_process.kick_off.title'),
                    desc: this.$t('pages.creation_process.kick_off.desc'),
                    assets: 4
                },
                {
                    icon: 'group',
                    title: this.$t('pages.creation_process.user_research.title'),
                    desc: this.$t('pages.creation_process.user_research.desc'),
                    assets: 5
                },
                {
                    icon: 'sitemap',
                    title: this.$t('pages.creation_process.ia_wireframes.title'),
                    desc: this.$t('pages.creation_process.ia_wireframes.desc'),
                    assets: 3
                },
                {
                    icon: 'pencil',
                    title: this.$t('pages.creation_process.design.title'),
                    desc: this.$t('pages.creation_process.design.desc'),
                    assets: 4
                },
                {
                    icon: 'list-check',
                    title: this.$t('pages.creation_process.delivery.title'),
                    desc: this.$t('pages.creation_process.delivery.desc'),
                    assets: 5
                },
                {
                    icon: 'search-alt',
                    title: this.$t('pages.creation_process.support.title'),
                    desc: this.$t('pages.creation_process.support.desc'),
                    assets: false
                }
            ]
        },
        labels() {
            return {
                title: this.$t('pages.home.process_title').split(' '),
                subtitle: this.$t('pages.home.process_subtitle')
            }
        }
    },
    methods: {
        openStep(step) {
            let data = {
                step: step,
                steps: this.steps
            }
            this.$root.$emit('CreationStep', data)
        }
    }
}
</script>

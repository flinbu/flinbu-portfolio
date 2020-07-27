<template>
    <b-container fluid class="module module__creation content content__middle pt-0 pb-6 py-md-6 py-lg-10">
        <b-container class="module__wrapper px-0">
            <b-row class="module__content">
                <b-col class="module__data" cols="12">
                    <module-title
                        :strongText="labels.title[0]"
                        :lightText="labels.title[1]"
                        :supText="labels.subtitle"
                        justify="center"
                        class="text-center mb-5 mb-md-7"
                    />
                    <b-row class="creation-process__wrapper" align-v="stretch" align-h="center">
                        <b-col cols="12">
                            <carousel 
                                class="creation-process__carousel carousel"
                                :items="3"
                                :nav="false"
                                :responsive="responsive"
                                auto-height
                            >
                                <div 
                                    v-for="(step, index) in steps" 
                                    :key="index" class="creation-process__step" 
                                    cols="12" 
                                >
                                    <div class="creation-process__content text-left">
                                        <icon
                                            v-if="step.icon"
                                            :name="step.icon"
                                            class="creation-process__icon"
                                        />
                                        <h3 class="creation-process__title">
                                            {{ index + 1}}. {{ $t(`pages.creation_process.${step.slug}.title`) }}
                                        </h3>
                                        <div class="creation-process__description" v-html="$t(`pages.creation_process.${step.slug}.desc`)"/>
                                        <div v-if="step.assets" class="creation-process__assets--wrapper">
                                            <h3 class="creation-process__title">{{ $t('pages.creation_process.assets') }}</h3>
                                            <ul class="creation-process__assets">
                                                <li v-for="(asset, i) in step.assets" :key="`step-${index}-asset-${i}`">{{ $t(`pages.creation_process.${step.slug}.assets.${asset}`) }}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <template slot="prev">
                                    <span class="owl-nav-prev">
                                        <icon name="chevron-left" size="md"/>
                                    </span>
                                </template>
                                <template slot="next">
                                    <span class="owl-nav-next">
                                        <icon name="chevron-right" size="md"/>
                                    </span>
                                </template>
                            </carousel>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<script>
import carousel from 'vue-owl-carousel'
export default {
    components: {
        carousel
    },
    computed: {
        steps() {
            return [
                {
                    slug: 'brief',
                    icon: 'paperclip',
                    assets: 2
                },
                {
                    slug: 'kick_off',
                    icon: 'planet',
                    assets: 4
                },
                {
                    slug: 'user_research',
                    icon: 'group',
                    assets: 5
                },
                {
                    slug: 'ia_wireframes',
                    icon: 'sitemap',
                    assets: 3
                },
                {
                    slug: 'design',
                    icon: 'pencil',
                    assets: 4
                },
                {
                    slug: 'delivery',
                    icon: 'list-check',
                    assets: 5
                },
                {
                    slug: 'support',
                    icon: 'search-alt',
                    assets: false
                }
            ]
        },
        labels() {
            return {
                title: this.$t('pages.home.process_title').split(' '),
                subtitle: this.$t('pages.home.process_subtitle')
            }
        },
        responsive() {
            return {
                0: {
                    items: 1,
                    autoHeight: true
                },
                768: {
                    items: 2,
                    autoHeight: false
                },
                992: {
                    items: 3,
                    autoHeight: false
                }
            }
        }
    }
}
</script>

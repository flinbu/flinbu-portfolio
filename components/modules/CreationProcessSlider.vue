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
                        class="text-center mb-5"
                    />
                    <b-row class="creation-process__wrapper" align-v="stretch" align-h="center">
                        <b-col cols="12">
                            <hooper class="creation-process__carousel carousel" :settings="sliderSettings" ref="hooper">
                                <slide
                                    v-for="(step, i) in creation_process"
                                    :key="`creation-process-${i}`"
                                    :index="i"
                                    class="creation-process__step"
                                >
                                    <div class="creation-process__content text-left">
                                        <icon
                                            v-if="step.icon"
                                            :name="step.icon"
                                            class="creation-process__icon"
                                        />
                                        <h3 class="creation-process__title">
                                            {{ i + 1 }}. {{ lang === 'es' ? step.title_es : step.title }}
                                        </h3>
                                        <div class="creation-process__description" v-html="lang === 'es' ? step.content_es : step.content"/>
                                        <div v-if="step.assets" class="creation-process__assets-wrapper">
                                            <h3 class="creation-process__title">{{ $t('pages.creation_process.assets') }}</h3>
                                            <ul class="creation-process__assets">
                                                <li v-for="(asset, e) in step.assets" :key="`step-${i}-asset-${e}`">{{ asset }}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </slide>

                                <hooper-pagination slot="hooper-addons"/>
                                <hooper-navigation slot="hooper-addons"/>
                            </hooper>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import {
    Hooper,
    Slide,
    Pagination as HooperPagination,
    Navigation as HooperNavigation
} from 'hooper'
export default {
    components: {
        Hooper,
        Slide,
        HooperPagination,
        HooperNavigation
    },
    computed: {
        ...mapGetters({
            creation_process: 'creation_process'
        }),
        lang() {
            return this.$i18n.locale
        },
        labels() {
            return {
                title: this.$t('pages.home.process_title').split(' '),
                subtitle: this.$t('pages.home.process_subtitle')
            }
        },
        sliderSettings() {
            return {
                itemsToShow: 3,
                itemsToSlide: 3,
                centerMode: false,
                wheelControl: false,
                breakpoints: {
                    0: {
                        itemsToShow: 1,
                        itemsToSlide: 1
                    },
                    768: {
                        itemsToShow: 2,
                        itemsToSlide: 2
                    },
                    992: {
                        itemsToShow: 3,
                        itemsToSlide: 3
                    }
                }
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
    },
    methods: {
        updateWidth() {
            const hooper = this.$refs.hooper
            if (hooper) hooper.updateWidth()
        }
    }
}
</script>

<template>
    <div class="app__portfolio">
        <b-container class="module module__portfolio py-10">
            <b-row>
                <b-col cols="12" class="module__wrapper">
                    <div class="module__content mb-8">
                        <module-title
                            :strong-text="labels.title[0]"
                            :light-text="labels.title[1]"
                            justify="center"
                        />
                    </div>
                </b-col>
                <b-col cols="12" class="module__wrapper portfolio__wrapper">
                    <b-row align-v="stretch" class="mb-6">
                        <b-col
                            v-for="(item, i) in portfolio"
                            :key="`portfolio-item-${i}`"
                            class="portfolio__item--wrapper"
                            cols="12" 
                            md="6" 
                            lg="4" 
                            :xl="cols"
                        >
                            <b-card
                                class="portfolio__item h-100"
                                @click="visitItem(item.url)"
                            >
                                <b-card-img-lazy
                                    :src="item.image"
                                    :blank-src="`${item.image}?lqip`"
                                />
                                <b-card-title>
                                    {{ item.title }}
                                </b-card-title>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col
                            cols="12"
                            class="d-flex align-items-center justify-content-center"
                        >
                            <a 
                                :href="portfolioURL" 
                                target="_blank"
                                class="app-button app-button__anchor app-button__main app-button__has-shadow text-white"
                            >{{ labels.fullPortofolio }}</a>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            portfolioURL: process.env.DRIBBBLE_URL
        }
    },
    computed: {
        labels() {
            return {
                title: this.$t('pages.portfolio.title').split(' '),
                fullPortofolio: this.$t('pages.portfolio.cta')
            }
        },
        cols() {
            const gridCols = 3
            return 12 / gridCols
        },
        portfolio() {
            return this.$store.state.portfolio.items
        }
    },
    methods: {
        visitItem(url) {
            window.open(url, "_blank")
        }
    },
    head() {
        return {
            title: `${this.$t('site.title')} - ${this.$t('pages.portfolio.title')}`
        }
    }
}
</script>
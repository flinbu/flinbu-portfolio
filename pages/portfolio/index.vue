<template>
    <div class="app__portfolio">
        <b-container class="module module__portfolio py-8 py-md-10">
            <b-row align-h="center">
                <b-col cols="12" class="module__wrapper">
                    <div class="module__content mb-5">
                        <module-title
                            :strong-text="labels.title[0]"
                            :light-text="labels.title[1]"
                            justify="left"
                        />
                    </div>
                </b-col>
                <b-col cols="12" class="module__wrapper portfolio__wrapper">
                    <b-row align-v="stretch" class="position-relative">
                        <portfolio-filters 
                            :filters="filters" 
                            v-model="filterBy"
                            @filterBy="filterPortfolio"
                        />
                        <b-col
                            cols="12"
                            md="10"
                            lg="11"
                        >
                            <transition-group name="list-complete" tag="div" :class="`row align-items-stretch list-complete portfolio__list portfolio__list--${animatedList ? 'animated' : 'static'}`">
                                <b-col
                                    v-for="(item, i) in filteredItems"
                                    :key="`portfolio-item-${i}`"
                                    class="portfolio__item--wrapper"
                                    cols="12" 
                                    md="6" 
                                    lg="4" 
                                    :xl="cols"
                                    :data-groups="item.category"
                                >
                                    <b-card
                                        class="portfolio__item h-100"
                                        @click="visitItem(item)"
                                    >
                                        <b-card-img-lazy
                                            :src="item.thumbnail"
                                            :blank-src="item.thumbnail_ph"
                                            height="330"
                                            :ref="`portfolioImage-${item.id}`"
                                            v-on:update:show="updateImg(`portfolioImage-${item.id}`)"
                                        />
                                        <b-card-title>
                                            {{ item.title }}
                                        </b-card-title>
                                    </b-card>
                                </b-col>
                            </transition-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col
                            cols="12"
                            class="d-flex align-items-center justify-content-center mt-4"
                        >
                            <button-group
                                class="module__action d-flex align-items-center justify-content-center flex-wrap"
                                :buttons="buttons"
                                button-class="module__action mb-5"
                            />
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import PortfolioFilters from '~/components/PortfolioFilters'
export default {
    components: {
        PortfolioFilters
    },
    data() {
        return {
            portfolio: [],
            animatedList: false,
            filterBy: 'All'
        }
    },
    computed: {
        buttons() {
            return [
                {
                    type: 'modal',
                    label: this.$t('pages.portfolio.creation_process'),
                    target: 'showProcess',
                    theme: 'main',
                    shadow: true
                },
                {
                    type: 'modal',
                    label: this.$t('pages.portfolio.lets_work'),
                    target: 'showContact',
                    theme: 'main',
                    shadow: true
                }
            ]
        },
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
        filters() {
            return this.$store.state.contentful.categories
        },
        filteredItems() {
            if (this.filterBy == 'All') return this.portfolio

            return this.portfolio.filter( item => item.category.indexOf(this.filterBy) !== -1)
        }
    },
    methods: {
        visitItem({url, id}) {
            // window.open(url, "_blank")
            this.$router.push(url)
        },
        updateImg(el) {
            setTimeout( () => this.$refs[el][0].$el.classList.add('loaded'), 1000)
        },
        filterPortfolio(filter) {
            this.filterBy = filter
        }
    },
    head() {
        return {
            title: `${this.$t('site.title')} - ${this.$t('pages.portfolio.title')}`
        }
    },
    async fetch() {
        if (!this.$store.state.contentful.fetched) {
            await this.$store.dispatch('contentful/fetch')
            this.portfolio = this.$store.state.contentful.posts
        } else {
            this.portfolio = this.$store.state.contentful.posts
        }
    },
    mounted() {
        // document.getElementById('Smallchat').classList.add('has-bottom-menu')
    }
}
</script>
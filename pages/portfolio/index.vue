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
                    <b-row align-v="stretch" class="position-relative mb-5">
                        <portfolio-filters 
                            :filters="filters" 
                            v-model="filterBy"
                            @filterBy="filterPortfolio"
                        />
                        <b-col
                            cols="12"
                            class="portfolio__grid"
                        >
                            <transition-group name="list-complete" tag="div" :class="`row align-items-stretch list-complete portfolio__list portfolio__list--${animatedList ? 'animated' : 'static'}`">
                                <b-col
                                    v-for="(item, i) in filteredItems"
                                    :key="`portfolio-item-${i}`"
                                    class="portfolio__item--wrapper px-0"
                                    cols="12" 
                                    md="6" 
                                    lg="4"
                                    :data-groups="item.category"
                                >
                                    <b-card
                                        class="portfolio__item h-100"
                                        @click="visitItem(item)"
                                    >
                                        <b-card-img-lazy
                                            :src="`${assetsBase}/${item.featured_image}`"
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
import { mapGetters, mapActions } from 'vuex'
import PortfolioFilters from '~/components/PortfolioFilters'
export default {
  head() {
    return {
      title: this.$t('site.page_title', {
        page_title: this.$t('pages.portfolio.title')
      })
    }
  },
    components: {
        PortfolioFilters
    },
    data() {
        return {
            // portfolio: [],
            animatedList: false,
            filterBy: 'All',
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            portfolio: 'portfolio',
            categories: 'categories'
        }),
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
            return this.categories
        },
        filteredItems() {
            if (this.filterBy == 'All') return this.portfolio

            return this.portfolio.filter( item => item.category.indexOf(this.filterBy) !== -1)
        },
        assetsBase() {
            return `${process.env.apiUrl}/assets`
        }
    },
    watch: {
        loading(state) {
            this.$root.$emit('loading', state)
        }
    },
    methods: {
        ...mapActions({
            get_portfolio: 'get_portfolio',
            get_asset: 'get_asset'
        }),
        visitItem({slug, id}) {
            // window.open(url, "_blank")
            this.$router.push(`/portfolio/${slug}`)
        },
        updateImg(el) {
            setTimeout( () => this.$refs[el][0].$el.classList.add('loaded'), 1000)
        },
        filterPortfolio(filter) {
            this.filterBy = filter
        },
        async fetch_data() {
            this.loading = true
            await this.get_portfolio()
            this.loading = false
        }
    },
    async fetch() {
        if (!this.portfolio) await this.fetch_data()
    }
}
</script>
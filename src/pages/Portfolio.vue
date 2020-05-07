<template>
    <Layout>
        <transition name="fade" appear>  
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
                                v-for="(item, i) in $static.posts.edges"
                                :key="`portfolio-item-${i}`"
                                class="portfolio__item--wrapper"
                                cols="12" 
                                md="6" 
                                lg="4" 
                                :xl="cols"
                            >
                                <b-card
                                    class="portfolio__item h-100"
                                    :title="item.node.title"
                                    :img-src="item.node.image"
                                    @click="visitItem(item.node.url)"
                                />
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col
                                cols="12"
                                class="d-flex align-items-center justify-content-center"
                            >
                                <a 
                                    :href="dribbbleURL" 
                                    target="_blank"
                                    class="app-button app-button__anchor app-button__main app-button__has-shadow text-white"
                                >{{ labels.fullPortofolio }}</a>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </transition>
    </Layout>
</template>
<static-query>
query Dribbble {
    posts: allDribbble(order: ASC) {
        edges {
            node {
                title
                description
                image
                url
            }
        }
    }
}
</static-query>
<script>
export default {
    metaInfo: {
        title: 'Portfolio'
    },
    data() {
        return {
            dribbbleURL: process.env.GRIDSOME_DRIBBBLE_URL
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
        }
    },
    methods: {
        visitItem(url) {
            window.open(url, "_blank")
        }
    }
}
</script>

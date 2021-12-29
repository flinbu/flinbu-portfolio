<template>
    <div class="app__portfolio">
        <b-container class="module module__portfolio portfolio__single py-10">
            <b-row v-if="post" class="fadeIn" align-h="center">
                <b-col cols="12" class="module__wrapper">
                    <!-- Intro -->
                    <div class="module__content portfolio__intro mb-3">
                        <h1 class="portfolio__title">{{ post.title }}</h1>
                        <p v-if="post.excerpt" class="portfolio__excerpt">{{ post.excerpt }}</p>
                        <ul class="portfolio__category--wrapper">
                            <li 
                                v-for="(category, i) in post.category"
                                :key="`cat-${i}`"
                                class="portfolio__category"
                            >
                                {{ category }}
                            </li>
                        </ul>
                    </div>

                </b-col>
                <b-col v-if="postProtected" cols="12" class="modue moduke__wrapper portfolio__wrapper portfolio__protection">
                    <div class="portfolio__content" v-html="post.protected_content"/>
                    <access-post @success="protect = false"/>
                </b-col>
                <b-col v-else cols="12" class="module__wrapper portfolio__wrapper portfolio__content animated fadeIn">
                    <div class="portfolio__content--wrapper">
                        <div
                            v-for="(block, i) in post.content"
                            :key="`content-block-${i}`"
                            class="portfolio__content--block"
                        >
                            <h2 class="portfolio__content--title" v-if="block.showTitle" v-html="block.title"/>
                            <div class="post__content" v-html="block.content"/>
                        </div>
                    </div>
                    <div v-if="post.assets && post.assets.length > 0" class="portfolio__assets mt-5">
                        <h2 class="mb-1">{{ $t('pages.portfolio.assets') }}</h2>
                        <ul class="portfolio__category--wrapper">
                            <li 
                                v-for="(asset, i) in post.assets"
                                :key="`asset-${i}`"
                                class="portfolio__category"
                            >
                                {{ asset }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="post.technologies && post.technologies.length > 0" class="portfolio__assets mt-5">
                        <h2 class="mb-1">{{ $t('pages.portfolio.technologies') }}</h2>
                        <ul class="portfolio__category--wrapper">
                            <li 
                                v-for="(technology, i) in post.technologies"
                                :key="`technologie-${i}`"
                                class="portfolio__category"
                            >
                                {{ technology }}
                            </li>
                        </ul>
                    </div>
                </b-col>
            </b-row>
            <b-row align-h="center" class="mt-6">
                <b-col cols="12" class="module__wrapper portfolio__wrapper portfolio__content d-flex justify-content-center align-items-center flex-wrap" >
                    <button-group
                        class="module__action d-flex align-items-center justify-content-start flex-wrap"
                        :buttons="buttons"
                        button-class="module__action mb-5"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AccessPost from '~/components/AccessPost'
export default {
    components: {
        AccessPost
    },
    data() {
        return {
            loading: true,
            protect: false,
            post: false
        }
    },
    computed: {
        ...mapGetters({
            getPostID: 'portfolio_id',
            getItem: 'portfolio_item'
        }),
        slug() {
            return this.$route.params.slug
        },
        postContent() {
            if (!this.post) return ''
            return documentToHtmlString(this.post.content, options)
        },
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
        postProtected() {
            if (!this.post) return false
            return this.post.protected ? this.protect : false
        }
    },
    watch: {
        loading(state) {
            this.$root.$emit('loading', state)
        },
        post(data) {
            this.protect = data.protected
        }
    },
    methods: {
        ...mapActions({
            get_portfolio_item: 'get_portfolio_item'
        })
    },
    mounted() {
        if (this.post) this.protect = this.post.protected
    },
    async fetch() {
        this.loading = true
        this.post = await this.get_portfolio_item({
            field: 'slug',
            value: this.slug
        })
        this.loading = false
        if (!this.$store.state.cockpit.fetched) {
            this.$root.$emit('loading', true)
            await this.$store.dispatch('cockpit/fetch')
            this.$root.$emit('loading', false)
        } else {
            this.$root.$emit('loading', false)
        }
    }
}
</script>
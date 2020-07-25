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
                <b-col cols="12" class="module__wrapper portfolio__wrapper portfolio__content">
                    <RichTextRenderer
                        :document="post.content"
                        :nodeRenderers="renderOptions.renderNode"
                        :marksRenderers="renderOptions.renderMark"
                    />
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
        </b-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import { options } from '~/plugins/contentOptions'
export default {
    components: {
        RichTextRenderer
    },
    data() {
        return {
            loading: true,
            renderOptions: options
        }
    },
    computed: {
        ...mapGetters({
            getPost: 'contentful/getPost',
            getPostID: 'contentful/getPostID'
        }),
        postID() {
            if (!this.$store.state.contentful.fetched) return null
            return this.getPostID(this.$route.params.slug)
        },
        post() {
            if (!this.postID) return false
            return this.getPost(this.postID)
        },
        postContent() {
            return documentToHtmlString(this.post.content, options)
        }
    },
    fetch() {
        if (!this.$store.state.contentful.fetched) {
            this.$store.dispatch('contentful/fetch', () => {
                this.loading = false
            })
        } else {
            this.loading = false
        }
    }
}
</script>
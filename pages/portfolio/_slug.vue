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
                <b-col v-else cols="12" class="module__wrapper portfolio__wrapper portfolio__content">
                    <div class="portfolio__content" v-html="post.content"/>
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
import { mapGetters } from 'vuex'
import AccessPost from '~/components/AccessPost'
export default {
    components: {
        AccessPost
    },
    data() {
        return {
            loading: true,
            protect: null
        }
    },
    computed: {
        ...mapGetters({
            getPostID: 'cockpit/getID',
            getItem: 'cockpit/getItem'
        }),
        postID() {
            return this.getPostID(this.$route.params.slug)
        },
        post() {
            return this.getItem(this.postID)
        }, 
        postContent() {
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
            return this.post.protected ? this.protect : false
        }
    },
    watch: {
        post(data) {
            this.protect = data.protected
        }
    },
    async fetch() {
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
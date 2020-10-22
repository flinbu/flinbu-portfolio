<template>
    <div class="app__bookmarks">
        <b-container v-if="loaded" class="module module__bookmarks py-8 py-md-10">
            <b-row align-h="center">
                <b-col class="module__wrapper" cols="12" md="6">
                    <div class="module__content mb-5">
                        <module-title
                            :strong-text="labels.title[0]"
                            :light-text="labels.title[1]"
                            justify="center"
                            class="mb-3"
                        />
                        <b-row align-h="center">
                            <b-col cols="12" md="6" lg="4">
                                <b-dropdown
                                    :text="filterBy"
                                    class="contact-form__select"
                                    lazy
                                >
                                    <b-dropdown-item
                                        :active="filterBy == 'All'"
                                        @click="filterBy = 'All'"
                                    >All</b-dropdown-item>
                                    <b-dropdown-item
                                        v-for="(item, i) in categories"
                                        :key="i"
                                        :active="filterBy == item"
                                        @click="filterBy = item"
                                    >{{ item }}</b-dropdown-item>
                                </b-dropdown>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col class="module__wrapper bookmarks__wrapper" cols="12">
                    <b-row class="position-relative mb-5" align-h="center">
                        <b-col cols="12" md="10" lg="9">
                            <b-card-group v-if="bookmarks.length > 0" columns>
                                <b-card 
                                    no-body
                                    class="bookmark mb-3 p-0"
                                    tag="article"
                                    v-for="bookmark in filteredBookmarks"
                                    :key="`bookmark-${bookmark.id}`"
                                >
                                    <b-card-img-lazy
                                        :src="bookmark.image"
                                        :blank-src="bookmark.thumbnail"
                                        :alt="bookmark.title"
                                        top
                                    />
                                    <b-card-title @click="openLink(bookmark.link)" class="px-3 pt-4 pb-2">{{ bookmark.title }}</b-card-title>
                                    <b-card-body class="px-3 pt-0 pb-3 d-flex justify-content-space-between align-items-center">
                                        <div class="bookmark__category">
                                            <span class="bookmark__category--content">{{ bookmark.category[0] }}</span>
                                        </div>
                                        <b-button :href="bookmark.link" class="ml-auto" target="_blank" variant="primary">View</b-button>
                                    </b-card-body>
                                </b-card>
                            </b-card-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            bookmarks: [],
            animatedList: false,
            filterBy: 'All',
            loaded: false
        }
    },
    computed: {
        ...mapGetters({
            getBookmarks: 'cockpit/getBookmarks',
            getCategories: 'cockpit/getBookmarksCategories'
        }),
        categories() {
            console.log(this.getCategories)
            return this.getCategories
        },
        filteredBookmarks() {
            if (this.filterBy == 'All') return this.bookmarks

            return this.bookmarks.filter( item => item.category.indexOf(this.filterBy) !== -1)
        },
        labels() {
            return {
                title: ['My', 'Bookmarks']
            }
        }
    },
    methods: {
        openLink(link) {
            window.open(link)
        }
    },
    async fetch() {
        if (!this.$store.state.cockpit.bookmarks_fetched) {
            this.$root.$emit('loading', true)
            await this.$store.dispatch('cockpit/fetch_bookmarks')
            this.$root.$emit('loading', false)
            this.bookmarks = this.getBookmarks
            this.loaded = true
        } else {
            this.bookmarks = this.getBookmarks
            this.loaded = true
        }
    }
}
</script>
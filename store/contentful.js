import { createClient } from '~/plugins/contentful.js'
import { slugThis, parsePostData } from '~/plugins/tools.js'
const contentClient = createClient()

export const state = () => ({
    posts: [],
    fetched: false,
    slugs: [],
    categories: []
})

export const mutations = {
    load (state, items) {
        state.posts = items
    },
    setSlugs (state, slugs) {
        state.slugs = slugs
    },
    setCategories (state, categories) {
        state.categories = categories
    },
    fetched (state, status) {
        state.fetched = status
    }
}

export const actions = {
    async fetch({ commit }) {
        // Get data from contentful
        try {
            let getPosts = await contentClient.getEntries({
                content_type: 'portfolio',
                order: '-sys.createdAt'
            })
            let slugs = []
            let categories = ['All']
            let posts = getPosts.items.map(post => {
                let postData = parsePostData(post)
                console.log(postData)
                let slug = slugThis(post.fields.title)
                slugs.push({
                    slug: slug,
                    id: post.sys.id
                })
                postData.category.forEach( cat => {
                    if (!categories.includes(cat)) categories.push(cat)
                })
                return postData
            })
            commit('load', posts)
            commit('setSlugs', slugs)
            commit('setCategories', categories)
            commit('fetched', true)
        } catch (e) {
            console.error(e)
            commit('fetched', false)
        }
    } 
}

export const getters = {
    getPost: state => id => {
        return state.posts.find(post => post.id == id)
    },
    getPostID: state => slug => {
        let item = state.slugs.find(post => {
            return post.slug == slug
        })
        return item.id
    }
}
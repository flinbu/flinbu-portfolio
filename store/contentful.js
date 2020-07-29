import { createClient } from '~/plugins/contentful.js'
import { slugThis, parsePostData } from '~/plugins/tools.js'
const contentClient = createClient()
// const fs = require('fs-extra')

const getDay = () => {
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    
    if (dd < 10) dd = `0${dd}`
    return `${dd}${mm}${yyyy}`
}

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
            // const today = getDay()
            // const basePath = '/data'
            // const dataPath = `${basePath}/contentful-${today}.js`
            // let getPosts = {}

            // Check cache file
            // fs.pathExists(dataPath, async (err, exists) => {
            //     if (!exists) {
            //         console.error('Cache file missing...')
            //         await fs.emptyDir(basePath)
            //         getPosts = await getPosts()
            //         try {
            //             await fs.writeJSON(dataPath, getPosts)
            //             console.log('Cache file created...')
            //         } catch (err) {
            //             console.error(err)
            //         }
            //     } else {
            //         try {
            //             getPosts = fs.readJSON(dataPath)
            //             console.log('Cache file readed...')
            //         } catch (err) {
            //             console.error(err)
            //             getPosts = await getPosts()
            //         }
            //     }
            // })

            let getPosts = await contentClient.getEntries({
                content_type: 'portfolio'
            })

            let slugs = []
            let categories = ['All']
            let posts = getPosts.items.map(post => {
                let postData = parsePostData(post)
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
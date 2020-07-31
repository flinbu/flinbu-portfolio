import CockpitSDK from 'cockpit-sdk'
import { slugThis } from '~/plugins/tools.js'

const assetsPath = `${process.env.API_HOST}/storage/uploads`

const cockpitClient = new CockpitSDK({
    host: process.env.API_HOST,
    accessToken: process.env.API_TOKEN
})

export const state = () => ({
    home: {},
    fetched: false,
    posts: [],
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
    setHome (state, data) {
        state.home = data
    },
    fetched (state, status) {
        state.fetched = status
    }
}

export const actions = {
    async fetch({ commit }) {

        // Fetch home data
        try {
            let home = await cockpitClient.singletonGet('homepage')
            let homeData = {
                data_visualization_image:`${assetsPath}${home.data_visualization_image.path}`,
                data_visualization_ph: cockpitClient.image(home.data_visualization_image._id, {
                    width: 100,
                    mode: 'bestFit',
                    quality: 10
                }),
                front_dev_image: `${assetsPath}${home.front_dev_image.path}`,
                front_dev_ph: cockpitClient.image(home.front_dev_image._id, {
                    width: 100,
                    mode: 'fitToWidth',
                    quality: 10
                }),
                portfolio: home.portfolio,
                fetched: true
            }
            commit('setHome', homeData)
        } catch (err) {
            console.error('homedata', err)
        }

        // Portfolio
        try {
            let portfolio = await cockpitClient.collectionGet('portfolio')
            let slugs = portfolio.entries.map( item => {
                return {
                    slug: slugThis(item.title),
                    id: item._id
                }
            })
            let categories = ['All']
            portfolio.entries.forEach( post => {
                categories.push(post.category.find( cat => {
                    if (!categories.includes(cat)) return cat
                }))
            })
            
            commit('load', portfolio.entries)
            commit('setSlugs', slugs)
            commit('setCategories', categories)
            commit('fetched', true)
        } catch (err) {
            console.error('portfolio', err)
        }
    }
}

export const getters = {
    getHomeData: state => data => {
        if (data) return state.home[data]

        return state.home
    },
    getHomePortfolio: state => {
        if (!state.fetched) return

        return state.home.portfolio.map( item => {
            let data = state.posts.find( post => post._id == item._id )
            return {
                title: data.title,
                image: `${assetsPath}${data.image.path}`,
                placeholder: cockpitClient.image(data.image._id, {
                    width: 100,
                    mode: 'thumbnail',
                    quality: 10
                }),
                url: `/portfolio/${slugThis(data.title)}`
            }
        })
    },
    getID: state => slug => {
        if (!state.fetched) return

        let post = state.slugs.find( item => item.slug == slug)
        return post.id
    },
    getItem: state => id => {
        if (!id || !state.fetched) return

        let post = state.posts.find( item => item._id == id)

        let postContent = post.content.replace(/(?:^|\W)\/cms\/storage\/uploads(?:$|\W)/g, `"${assetsPath}/`)

        let thumbnail_ph = cockpitClient.image(post.image._id, {
            mode: 'thumbnail',
            quality: 10
        })
        return {
            title: post.title,
            slug: slugThis(post.title),
            excerpt: post.excerpt || '',
            thumbnail: `${assetsPath}${post.image.path}`,
            thumbnail_ph: thumbnail_ph || false,
            url: `/portfolio/${slugThis(post.title)}`,
            content: postContent || '',
            technologies: (post.technologies && post.technologies.length > 0) ? post.technologies : [],
            category: (post.category && post.category.length > 0) ? post.category : [],
            assets: (post.assets && post.assets.length > 0) ? post.assets : []
        }
    },
    getAssetFullPath: state => path => {
        return `${assetsPath}${path}`
    },
    getPortfolio: state => {
        if (!state.fetched) return []
        return state.posts.map( post => {
            let thumbnail = cockpitClient.image(post.image._id, {
                width: 400,
                height: 400 * 320 / 330,
                pixelRatio: 2,
                mode: 'bestFit',
                quality: 90
            })
            let thumbnail_ph = cockpitClient.image(post.image._id, {
                width: 100,
                height: 100 * 320 / 330,
                mode: 'bestFit',
                quality: 20,
                filters: {
                    blur: 100
                }
            })
            return {
                id: post._id,
                title: post.title,
                category: post.category,
                thumbnail: thumbnail,
                thumbnail_ph: thumbnail_ph,
                url: `/portfolio/${slugThis(post.title)}`
            }
        })
    },
    getCategories: state => {
        if (!state.fetched) return []

        return state.categories
    }
}
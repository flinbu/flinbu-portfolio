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
    categories: [],
    social: []
})

export const mutations = {
    load (state, items) {
        state.posts = items
    },
    slugs (state, slugs) {
        state.slugs = slugs
    },
    categories (state, categories) {
        state.categories = categories
    },
    home (state, data) {
        state.home = data
    },
    fetched (state, status) {
        state.fetched = status
    },
    social (state, items) {
        state.social = items
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
            commit('home', homeData)
        } catch (err) {
            console.error('homedata', err)
        }

        // Portfolio
        try {
            let portfolio = await cockpitClient.collectionGet('portfolio')
            let slugs = portfolio.entries.map( item => {
                return {
                    slug: item.title_slug,
                    id: item._id
                }
            })
            let categories = ['All']
            portfolio.entries.forEach( post => {
                post.category.forEach( cat => {
                    if (cat && !categories.includes(cat)) categories.push(cat)
                })
            })
            
            commit('load', portfolio.entries)
            commit('slugs', slugs)
            commit('categories', categories)
            commit('fetched', true)
        } catch (err) {
            console.error('portfolio', err)
        }

        // Social
        try {
            let social = await cockpitClient.collectionGet('social')
            commit('social', social.entries.reverse().map( item => {
                return {
                    network: slugThis(item.name),
                    icon: item.icon,
                    url: item.url,
                    label: item.name
                }
            }))
        } catch (err) {
            console.error('social', err)
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
                url: `/portfolio/${data.title_slug}`
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
            slug: post.title_slug,
            excerpt: post.excerpt || '',
            thumbnail: `${assetsPath}${post.image.path}`,
            thumbnail_ph: thumbnail_ph || false,
            url: `/portfolio/${post.title_slug}`,
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
            let thumbnail_ph = cockpitClient.image(post.image._id, {
                width: 100,
                height: 100 * 960 / 1280,
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
                thumbnail: `${assetsPath}${post.image.path}`,
                thumbnail_ph: thumbnail_ph,
                url: `/portfolio/${post.title_slug}`
            }
        })
    },
    getCategories: state => {
        if (!state.fetched) return []

        return state.categories
    },
    getSocial: state => {
        if (!state.fetched) return []

        return state.social
    }
}
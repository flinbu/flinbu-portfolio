export const state = () => ({
    items: []
})

export const mutations = {
    load (state, items) {
        state.items = items
    }
}

export const actions = {
    async fetch({ commit }) {
        // Get data from Dribbble
        const dribbleQuery = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_TOKEN}`
        const { data } = await this.$axios.get(dribbleQuery)
        if (data && data.length > 0) {
            let portfolio = data.map( item => {
                return {
                    title: item.title,
                    image: item.images.hidpi,
                    description: item.description,
                    url: item.html_url
                }
            })
            commit('load', portfolio)
        }
    }
}
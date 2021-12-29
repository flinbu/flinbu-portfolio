import cookie from 'cookie'

export const state = () => ({
  locales: ['en', 'es'],
  locale: 'en',
  portfolio: false,
  categories: false
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  PORTFOLIO: (state, data) => state.portfolio = data,
  CATEGORIES: (state, data) => state.categories = data
}

export const actions = {

  async nuxtServerInit({ commit, dispatch }, { req }) {
    if (req) {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie)
        // Handle locale cookie
        if (cookies.lang) {
          commit('SET_LANG', cookies.lang)
        }
      }
    }
    dispatch('contentful/fetch', { root: true })
  },

  // Get portfolio
  async get_portfolio( { commit } ) {
    try {
      const portfolio = await this.$directus.items('portfolio')
      let data = await portfolio.read({
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
      if (data.data) {
        commit('PORTFOLIO', data.data)
        let categories = ['All']
        data.data.forEach( post => {
          post.category.forEach( cat => {
            if (cat && !categories.includes(cat)) categories.push(cat)
          })
        })
        commit('CATEGORIES', categories)
      } else {
        console.error('get_portfolio', data)
        return {
          error: true,
          data: portfolio
        }
      }
    } catch (err) {
      console.error('get_portfolio', err)
      return {
        error: true,
        data: err
      }
    }
  },
  async get_portfolio_item( { state }, { field, value }) {
    if (!field) field = 'id'
    if (!value) return false
    try {
      const query = {}
      query[field] = {
        _eq: value
      }
      const items = await this.$directus.items('portfolio')
      let data = await items.read({
        filter: query
      })
      if (data.data) {
        if (data.data.length > 0) return data.data[0]
        return false
      } else {
        console.error('get_portfolio_item', data)
        return {
          error: true,
          data: data
        }
      }
    } catch (err) {
      console.error('get_portfolio_item', err)
      return {
        error: true,
        data: err
      }
    }
  }

}

export const getters = {
  portfolio: state => state.portfolio,
  portfolio_id: state => slug => {
    const item = state.portfolio.find( p => p.slug == slug )
    if (!item) return false
    return item.id
  },
  portfolio_item: state => item => state.portfolio.find( p => p.id == item ) || false,
  portfolio_by_slug: state => item => state.portfolio.find( p => p.slug == item) || false,
  categories: state => state.categories
}
import cookie from 'cookie'

export const state = () => ({
  locales: ['en', 'es'],
  locale: 'en',
  portfolio: false,
  categories: false,
  app_data: false,
  about: false,
  home_portfolio: false
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  PORTFOLIO: (state, data) => state.portfolio = data,
  CATEGORIES: (state, data) => state.categories = data,
  APP_DATA: (state, data) => state.app_data = data,
  ABOUT: (state, data) => state.about = data,
  HOME_PORTFOLIO: (state, data) => state.home_portfolio = data
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
  },

  // Get site options
  async get_app_data({ commit, dispatch } ) {
    try {
      const site_options = await this.$directus.items('site_options')
      let data = await site_options.read()
      if (data.data) {
        commit('APP_DATA', data.data)
        dispatch('get_portfolio_slider')
      } else {
        console.error('get_app_data', data)
        return {
          error: true,
          data: data
        }
      }
    } catch (err) {
      console.error('get_app_data', err)
      return {
        error: true,
        data: err
      }
    }
  },

  // Home portfolio slider
  async get_portfolio_slider({ commit, state }) {
    try {
      const portfolio = this.$directus.items('portfolio')
      let data = await portfolio.read({
        limit: state.app_data.home_portfolio_items,
        filter: {
          home: {
            _eq: true
          }
        }
      })
      if (data.data) {
        commit('HOME_PORTFOLIO', data.data)
      } else {
        console.error('get_portfolio_slider', data)
        return {
          error: false,
          data: data
        }
      }
    } catch (err) {
      console.error('get_portfolio_slider', err)
      return {
        error: true,
        data: err
      }
    }
  },

  // About
  async get_about( { commit } ) {
    try {
      const about = await this.$directus.items('about')
      let data = await about.read()
      if( data.data) {
        commit('ABOUT', data.data)
      } else {
        console.error('get_about', data)
        return {
          error: true,
          data: data
        }
      }
    } catch (err) {
      console.error('get_about', err)
      return {
        error: true, 
        data: err
      }
    }
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
  app_data: state => state.app_data,
  contact: state => {
    return {
      email: state.app_data.contact_email || '',
      phone: state.app_data.contact_phone || '',
      chat: state.app_data.chat || false,
      chat_code: state.app_data.chat_code || ''
    }
  },
  home_content: state => {
    return {
      data_visualization: {
        image: state.app_data.data_visualization_image ? `${process.env.apiUrl}/assets/${state.app_data.data_visualization_image}` : ''
      },
      front_dev: {
        image: state.app_data.front_dev_image ? `${process.env.apiUrl}/assets/${state.app_data.front_dev_image}` : ''
      },
      portfolio: state.home_portfolio
    }
  },
  home_portfolio: state => {
    if (!state.home_portfolio) return false
    return state.home_portfolio.map( item => {
      return {
        image: `${process.env.apiUrl}/assets/${item.featured_image}`,
        url: `/portfolio/${item.slug}`
      }
    })
  },
  creation_process: state => state.app_data.creation_process || [],
  social_links: state => state.app_data.social || [],
  about: state => state.about,
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
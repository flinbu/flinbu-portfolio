import cookie from 'cookie'

export const state = () => ({
  locales: ['en', 'es'],
  locale: 'en'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
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
  }

}

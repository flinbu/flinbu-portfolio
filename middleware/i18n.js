export default function ({ isHMR, app, store, route, params, error, redirect, res }) {
    if (isHMR) return
  
    if (route.query.lang) {
      if (process.server) {
        res.setHeader('Set-Cookie', [`lang=${route.query.lang}`]) // Server-side
      } else {
        document.cookie = `lang=${route.query.lang}` // Client-side
      }
    }
  
    let locale = route.query.lang || store.state.locale || 'es'
    if (store.state.locales.indexOf(locale) === -1) {
      locale = 'es'
    }
    // Set locale
    store.commit('SET_LANG', locale)
    app.i18n.locale = store.state.locale
  }
    
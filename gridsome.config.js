// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: process.env.GRIDSOME_SITE_NAME,
  siteDescription: process.env.GRIDSOME_SITE_DESCRIPTION,
  siteUrl: process.env.GRIDSOME_SITE_URL,
  plugins: [
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GA_UA
      }
    },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        baseId: 'appgdNHtR9HAbVowJ',
        tableName: 'Gigs',
        typeName: 'Gig'
      }
    },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        baseId: 'appsGip9LDER3YCTH',
        tableName: 'main',
        typeName: 'BioLink'
      }
    },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        baseId: 'app1hWcRe8qIKmjiJ',
        tableName: 'Questions',
        typeName: 'KickForm',
        select: {
          sort: [{
            field: 'ID',
            direction: 'desc'
          }]
        }
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000,
        exclude: ['/kickoff'],
        config: {
          '/': {
            changefreq: 'weekly',
            priority: 1
          },
          '/portfolio': {
            changefreq: 'daily',
            priority: 1
          }
        }
      }
    }
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  css: {
    loaderOptions: {
      scss: {
        sourceComments: false
      }
    }
  }
}

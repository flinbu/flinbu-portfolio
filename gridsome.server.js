// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios")
const socialProfiles = require("./src/data/social.json")
const homeModules = require("./src/data/home-modules.json")
const Behance = {
  apiKey: process.env.BEHANCE_API_KEY,
  username: process.env.BEHANCE_USERNAME
}
module.exports = function (api) {
  api.loadSource(store => {
    const contentType = store.addContentType({
      typeName: "Social"
    })

    for (const item of socialProfiles) {
      contentType.addNode({
        network: item.network,
        icon: item.icon,
        url: item.url
      })
    }
  })

  api.loadSource(store => {
    const contentType = store.addContentType({
      typeName: "HomeModule"
    })

    for (const item of homeModules) {
      contentType.addNode({
        id: item.name,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        buttons: item.buttons,
        image: item.image,
        logos: item.logos
      })
    }
  })

  api.loadSource(async store => {
    const { data } = await axios.get(`http://www.behance.net/v2/users/${Behance.username}/projects?api_key=${Behance.apiKey}`)
    const contentType = store.addContentType({
      typeName: "Portfolio"
    })
    for (const item of data.projects) {
      let projectFields = []
      for (let i = 0; i < item.fields.length; i++) {
        projectFields[i] = {
          title: item.fields[i]
        }
      }
      let newNode = {
        id: item.id,
        name: item.name,
        published_on: item.published_on,
        created_on: item.created_on,
        modified_on: item.modified_on,
        url: item.url,
        terms: projectFields,
        covers: item.covers,
        owner: item.owners[0]
      }
      contentType.addNode(newNode)
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}

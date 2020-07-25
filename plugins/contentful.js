const contentful = require('contentful')

module.exports = {
    createClient() {
        return contentful.createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: process.env.CONTENTFUL_DELIVERY_API
        })
    }
}
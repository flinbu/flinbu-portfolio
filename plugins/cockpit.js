const CockpitSDK = require('cockpit-sdk').default

module.exports = {
    cockpitClient() {
        return  new CockpitSDK({
            host: process.env.API_HOST,
            accessToken: process.env.API_TOKEN
        })
    } 
}
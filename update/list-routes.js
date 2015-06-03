const jsonist = require('jsonist')

    , url     = `https://api.mailgun.net/v3/routes`


function listRoutes (domain, creds, callback) {
  var options = { auth: `api:${creds["api-key"]}` }
  jsonist.get(url, options, callback)
}


module.exports = listRoutes
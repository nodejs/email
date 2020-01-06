const jsonist = require('jsonist')

const url = 'https://api.mailgun.net/v3/routes'

function listRoutes (domain, creds, callback) {
  const options = { auth: `api:${creds['api-key']}` }
  jsonist.get(url, options, callback)
}

module.exports = listRoutes

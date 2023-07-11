const jsonist = require('jsonist')

const url = 'https://api.mailgun.net/v3/routes'

function listRoutes (domain, callback) {
  const options = { auth: `api:${cprocess.env.MAILGUN_API_KEY}` }
  jsonist.get(url, options, callback)
}

module.exports = listRoutes

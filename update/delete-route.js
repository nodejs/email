const jsonist = require('jsonist')

const url = 'https://api.mailgun.net/v3/routes'

function deleteRoute (domain, creds, id, callback) {
  const options = { auth: `api:${creds['api-key']}` }
  jsonist.delete(`${url}/${id}`, options, callback)
}

module.exports = deleteRoute

const jsonist = require('jsonist')

const url = 'https://api.mailgun.net/v3/routes'

function deleteRoute (domain, id, callback) {
  const options = { auth: `api:${process.env.MAILGUN_API_KEY}` }
  jsonist.delete(`${url}/${id}`, options, callback)
}

module.exports = deleteRoute

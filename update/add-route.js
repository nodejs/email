const hyperquest = require('hyperquest')
const bl = require('bl')
const qs = require('querystring')

const url = 'https://api.mailgun.net/v3/routes'

function addRoute (domain, creds, description, expression, actions, callback) {
  const params = {
    description,
    expression,
    action: actions
  }
  const data = qs.stringify(params)
  const options = {
    auth: `api:${creds['api-key']}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': Buffer.byteLength(data)
    }
  }

  const req = hyperquest.post(url, options)

  req.pipe(bl(callback))
  req.end(data)
}

module.exports = addRoute

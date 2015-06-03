const hyperquest = require('hyperquest')
    , bl         = require('bl')

    , url        = 'https://api.mailgun.net/v3/routes'


function deleteRoute (domain, creds, id, callback) {
  var options = { auth: `api:${creds["api-key"]}` }

  hyperquest.delete(`${url}/${id}`, options).pipe(bl(callback))
}


module.exports = deleteRoute
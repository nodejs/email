const hyperquest = require('hyperquest')
    , bl         = require('bl')
    , qs         = require('querystring')

    , url        = `https://api.mailgun.net/v3/routes`


function addRoute (domain, creds, description, expression, actions, callback) {
  var params  = {
          description
        , expression
        , action : actions
      }
    , data    = qs.stringify(params)
    , options = {
          auth    : `api:${creds["api-key"]}`
        , headers : {
              'content-type': 'application/x-www-form-urlencoded'
            , 'content-length': Buffer.byteLength(data)
          }
      }

  var req = hyperquest.post(url, options)

  req.pipe(bl(callback))
  req.end(data)
}


module.exports = addRoute
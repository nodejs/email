// given a domain and a list of aliases, get the current routes for that domain
// and adjust them to match the list of provided aliases; removing ones that
// don't belong and adding ones that are new

const equal       = require('deep-equal')
    , after       = require('after')
    , xtend       = require('xtend')
    , listRoutes  = require('./list-routes')
    , addRoute    = require('./add-route')
    , deleteRoute = require('./delete-route')


function toExpression (domain, alias) {
  return `match_recipient("${alias.from}@${domain}")`
}


function toActions (alias) {
  var to = Array.isArray(alias.to) ? alias.to : [ alias.to ]
  return to.map(function (to) {
    return `forward("${to}")`
  }).concat([ `stop()` ])
}


function diff (domain, a1, a2) {
  a2 = a2.slice()

  return a1.filter(function (alias1) {
    return !a2.some(function (alias2, i) {
      if (alias2.expression == alias1.expression && equal(alias2.actions, alias1.actions)) {
        a2.splice(i, 1) // remove it so we don't match duplicates
        return true
      }
    })
  })
}


function updateAliases (domain, creds, aliases, callback) {
  function adjustRoutes (routes) {

    var current = routes.items

    // adjust the incoming aliases to have .expression and .actions properties
    aliases = aliases.map(function (alias) {
      return xtend(alias, {
          expression : toExpression(domain, alias)
        , actions    : toActions(alias)
      })
    })

    var toAdd    = diff(domain, aliases, current) // this diff gives us new additions
      , toRemove = diff(domain, current, aliases) // this diff gives us stale routes
      , done     = after(toAdd.length + toRemove.length, callback)

    console.log(`${toAdd.length} route(s) to add`)
    console.log(`${toRemove.length} route(s) to remove`)

    toAdd.forEach(function (alias) {
      var to = Array.isArray(alias.to) ? alias.to : [ alias.to ]
      console.log(`Adding ${alias.from} -> ${to.join(', ')}...`)
      addRoute(domain, creds, alias.from, alias.expression, alias.actions, done)
    })

    toRemove.forEach(function (alias) {
      console.log(`Deleting ${alias.expression}...`)
      deleteRoute(domain, creds, alias.id, done)
    })
  }

  listRoutes(domain, creds, function (err, routes) {
    if (err)
      throw err
    adjustRoutes(routes)
  })
}


module.exports = updateAliases

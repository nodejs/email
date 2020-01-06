// given a domain and a list of aliases, get the current routes for that domain
// and adjust them to match the list of provided aliases; removing ones that
// don't belong and adding ones that are new

const equal = require('deep-equal')
const after = require('after')
const xtend = require('xtend')
const listRoutes = require('./list-routes')
const addRoute = require('./add-route')
const deleteRoute = require('./delete-route')

function toExpression (domain, alias) {
  return `match_recipient("${alias.from}@${domain}")`
}

function toActions (alias) {
  const to = Array.isArray(alias.to) ? alias.to : [alias.to]
  return to.map(function (to) {
    return `forward("${to}")`
  }).concat(['stop()'])
}

function diff (domain, a1, a2) {
  a2 = a2.slice()

  return a1.filter(function (alias1) {
    return !a2.some(function (alias2, i) {
      if (alias2.expression === alias1.expression && equal(alias2.actions, alias1.actions)) {
        a2.splice(i, 1) // remove it so we don't match duplicates
        return true
      }
    })
  })
}

function updateAliases (domain, creds, aliases, dryRun, callback) {
  function adjustRoutes (routes) {
    const current = routes.items

    // adjust the incoming aliases to have .expression and .actions properties
    aliases = aliases.map(function (alias) {
      return xtend(alias, {
        expression: toExpression(domain, alias),
        actions: toActions(alias)
      })
    })

    const toAdd = diff(domain, aliases, current) // this diff gives us new additions
    const toRemove = diff(domain, current, aliases) // this diff gives us stale routes
    const done = after(toAdd.length + toRemove.length, callback)

    console.log(`${toAdd.length} route(s) to add`)
    console.log(`${toRemove.length} route(s) to remove`)

    toAdd.forEach(function (alias) {
      const to = Array.isArray(alias.to) ? alias.to : [alias.to]
      console.log(`Adding ${alias.from} -> ${to.join(', ')}...`)
      if (!dryRun) {
        addRoute(domain, creds, alias.from, alias.expression, alias.actions, done)
      }
    })

    toRemove.forEach(function (alias) {
      console.log(`Deleting ${alias.expression}...`)
      if (!dryRun) {
        deleteRoute(domain, creds, alias.id, done)
      }
    })
  }

  listRoutes(domain, creds, function (err, routes) {
    if (err) { throw err }
    adjustRoutes(routes)
  })
}

module.exports = updateAliases

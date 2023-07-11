#!/usr/bin/env node
require('dotenv').config()

const fs   = require('fs')
    , path = require('path')
    , updateAliases = require('./update-aliases')

require('http').globalAgent.maxSockets = 20

if (process.argv.length < 3) {
  console.error('Usage: update [--dry-run] <domain>')
  return process.exit(1)
}

const dryRun    = process.argv.includes('--dry-run')
    , domain    = process.argv.filter((a) => a !== '--dry-run')[2].replace(/\/$/, '')
    , dir       = path.join(__dirname, '..', domain)

if (!process.env.MAILGUN_API_KEY) {
  console.error(`Error: MAILGUN_API_KEY environment variable is not set`)
  return process.exit(1)
}

const aliases = require(path.join(dir, 'aliases.json'))

updateAliases(domain, aliases, dryRun, function (err) {
  if (err)
    throw err
})

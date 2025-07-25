#!/usr/bin/env node
require('dotenv').config()

const path = require('path')
const updateAliases = require('./update-aliases')

require('http').globalAgent.maxSockets = 20

if (process.argv.length < 3) {
  console.error('Usage: update [--dry-run] <domain>')
  process.exit(1)
}

const dryRun = process.argv.includes('--dry-run')
const domain = process.argv.filter((a) => a !== '--dry-run')[2].replace(/\/$/, '')
const dir = path.join(__dirname, '..', domain)

if (!process.env.MAILGUN_API_KEY) {
  console.error('Error: MAILGUN_API_KEY environment variable is not set')
  process.exit(1)
}

const aliases = require(path.join(dir, 'aliases.json'))

updateAliases(domain, aliases, dryRun, function (err) {
  if (err) { throw err }
})

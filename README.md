# nodejs/email

**MX server management for iojs.org (and eventually nodejs.org)**

## Email aliases

The [iojs.org](./iojs.org) directory contains an [aliases.json](./iojs.org/aliases.json) file that provides email mappings for the iojs.org domain. It maps `"from"` usernames @iojs.org to `"to"` email addresses.

A _credentials.json_ file needs to exist in the same directory containing an `"api-key"` property for the [mailgun](http://www.mailgun.com/) account managing the iojs.org MX servers.

## Updating

The [update](./update) directory contains a simple node program that you run and provide a domain (`update/update.js iojs.org`) which will read the aliases, fetch the list of mail routes from mailgun and update the routes to make sure they match the required aliases.

## License & copyright

The contents of this repository is Copyright (c) 2015 The Node.js Foundation and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.


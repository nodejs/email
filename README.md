# nodejs/email

**MX server management for iojs.org**

## Email aliases

The [iojs.org](./iojs.org) directory contains an [aliases.json](./iojs.org/aliases.json) file that provides email mappings for the iojs.org domain. It maps `"from"` usernames @iojs.org to `"to"` email addresses.

A _credentials.json_ file needs to exist in the same directory containing an `"api-key"` property for the [mailgun](http://www.mailgun.com/) account managing the iojs.org MX servers.

## Updating

The [update](./update) directory contains a simple node program that you run and provide a domain (`update/update.js iojs.org`) which will read the aliases, fetch the list of mail routes from Mailgun and update the routes to make sure they match the required aliases. The Mailgun API key for the given domain is required to make this work. Use with `--dry-run` if you are unsure of the current status and what may be changed with an update.

Members of the Build Working Group "Infra" team (Rod Vagg, Johan Bergström, Michael Dawson and João Reis as of writing) can access the Mailgun API key via the Rackspace API or in the `admin_logins.md` file in the secrets repo (build/infra/). This key must be placed in a file named `iojs.org/credentials.json` in the form: `{ "api-key": "key-abc..." }`.

## nodejs.org email aliases

nodejs.org aliases are managed by the Linux Foundation.  In order to set one up:

* create an iojs.org alias and associate the intended recipients to it.
* email 'helpdesk@rt.linuxfoundation.org' requesting that the nodejs.org point to the alias. In the email, CC a Node.js Foundation contact (Executive Director or other staff) and provide context as to why the alias is needed.

## License & copyright

The contents of this repository is Copyright (c) Node.js Foundation and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.


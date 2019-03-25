# nodejs/email

**MX server management for iojs.org**


## Server

[Mailgun](http://www.mailgun.com/) is used to route email from the `iojs.org` domain to the aliases, as described in this repo.


## Email aliases

The [iojs.org](./iojs.org) directory contains the [aliases.json](./iojs.org/aliases.json) file that describes email aliasing. It is a mapping of `"from"` usernames @iojs.org to `"to"` actual email addresses.


## Updating

### Responsibility

Merging a PR sould be done concomitantly with updating the mail routes in Mailgun. Since access to the Mailgun API key is required, only members of the @nodejs/build-infra team have the permission to push code to the `master` branch. That is in order to minimize the probability of mismatches between the information in this repo, and the actual email routes setup.

The Mailgun API key can be found in the `admin_logins.md` file in the secrets repo (build/infra/), or direclty via the Rackspace API.

### Procedure

The [update](./update) directory contains a simple node program that you run and provide a domain (`update/update.js iojs.org`) which will read the aliases, fetch the list of mail routes from Mailgun and update the routes to make sure they match the required aliases. The Mailgun API key for the given domain is required to make this work. The key must be stored as a file named `iojs.org/credentials.json` in the form: `{ "api-key": "key-abc..." }` within a code tree. The programs can be used with `--dry-run` to verifry the current status and what will be changed by an update.


# nodejs.org

`@nodejs.org` email adresses are managed by the Linux Foundation. In order to set one up:
* Create an iojs.org alias with associated recipients as described above.
* Send an email to 'helpdesk@rt.linuxfoundation.org' requesting that the wanted nodejs.org address by directed to the new alias. Please CC an OpenJS Foundation contact, and provide context as to why the alias is needed.

#### License & copyright

The contents of this repository is Copyright (c) Node.js Foundation and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.


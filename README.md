# nodejs/email

**MX server management for iojs.org**


## Server

[Mailgun](http://www.mailgun.com/) is used to route email from the `iojs.org` domain to the aliases described in this repo.


## Email aliases

The [iojs.org](./iojs.org) directory contains the [aliases.json](./iojs.org/aliases.json) file which describes the wanted email aliasing. It is structured as a mapping of `"from"` usernames @iojs.org to `"to"` actual email addresses.


## Updating

### Responsibility

Since access to the Mailgun API key is required, only members of the @nodejs/build-infra team have the permission to push code to the `main` branch. That was done in order to minimize the possibility of mismatches between the information in this repo, and the actual email routes that are set up.

### Automatic Procedure

There are two GitHub Actions workflows that run automatically when targeting changes to the `main` branch:
- `ci.yml` this workflow runs the update in `dry-run` mode and reports the changes that would be made. It is triggered by any PR against the `main` branch.
- `cd.yml` this workflow runs the update and actually applies the changes. It is triggered by any push to the `main` branch.
### Manual Procedure

The [update](./update) directory contains a node program which will read the aliases mapping file, fetch the list of mail routes from Mailgun and update the routes to make sure they match the required state. The program is run by passing it a domain name as an argument (`update/update.js iojs.org`).

The Mailgun API key for the given domain is required. It can be found in the `admin_logins.md` file in the secrets repo (build/infra/), or directly via the Rackspace API. The key should be used as environment variable `MAILGUN_API_KEY` when running the program.

The programs can be used with `--dry-run` to verify the current status and what will be changed by an update.


## nodejs.org

`@nodejs.org` email addresses are managed by the Linux Foundation. In order to set one up:
* Create an iojs.org alias with associated recipients as described above.
* Send an email to 'helpdesk@rt.linuxfoundation.org' requesting that the wanted nodejs.org address by directed to the new alias. Please CC an OpenJS Foundation contact person and provide context as to why the alias is needed.

## License & copyright

The contents of this repository are Copyright (c) Node.js Foundation and licensed under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.


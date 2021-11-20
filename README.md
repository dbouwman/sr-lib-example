# Semantic Releaes Example Repo

Created project via `$ npx tsdx create <module-name>`

## Setup Semantic Release

Steps:

- `npx semantic-release-cli setup`
  - this asked for npm and gh creds
  - added `NPM_TOKEN` to repo secrets
- install changelog plugin
  - `npm i @semantic-release/changelog -D`
- add `release.config.json` file

```json
{
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    "next",
    "next-major",
    { "name": "beta", "prerelease": true },
    { "name": "alpha", "prerelease": true }
  ],
  "repositoryUrl": "https://github.com/dbouwman/sr-example-lib",
  "tagFormat": "v${version}",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
}
```

- manually added `.github/workflows/release.yml`

```yml
name: Release
on:
  push:
    branches:
      - master
      - beta
      - alpha
jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 'lts/*'
          cache: 'npm'

      - name: Install
        run: npm ci
      # START: Change to your normal CI tests/linting etc
      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build
      # END

      # SEMANTIC-RELEASE
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

## Initial Release

With the above configuration, simply pushing an initial commit to `master` caused the `v1.0.0` release to be cut and published.

## Workflow

From there, created a `beta` branch, added some commits, pushed to upstream. This caused SR to create the `v1.1.0-beta.1` release

Created a branch from `beta`, made some `feat` commits, PR'd to `beta`, and when that merged, got `v1.1.0-beta.2` release

Created another branch from `beta`, made a breaking change, PR'd to `beta` and when that merged, got `v1.1.0-beta.3`; This was unexpected, but I continued...

Opened PR of `beta` into `master`, on merge we got `v1.1.0' which clearly indicated that I'd done _something_ wrong.

The issue was that although docs show a commit message like `feat(): new thing \n\n BREAKING CHANGE: wut?` it really needs to be a multi-line commit message...

```sh
$ git commit -m 'feat(): added new arg

BREAKING CHANGE: second arg is required'
```

When this merged into `beta` we got `2.0.0-beta.1` and when `beta` merged to `master` we got `2.0.0`

# TODO:

### Changelog

- Although `"@semantic-release/changelog"` is in the project, it is not working / no changelog file is being created
- Release tags are getting the summaries of the changes

### Tooling

- we need some kind of commit message linting
  - https://commitlint.js.org/#/guides-local-setup
- we need some easy way for people to construct breaking change messages
- everyone will need to _REALLY_ understand semver, as this puts the onus on the devs to do the right thing.

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

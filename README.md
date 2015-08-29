#ftw-npm

I'll `Follow` and `twit` about `npm` registry [_changes](http://guide.couchdb.org/draft/notifications.html) for you, human.

* https://github.com/iriscouch/follow
* https://github.com/ttezel/twit

## Install

`npm install`

## Config API keys
Make sure you have a JSON file in `config/twitter.json` with this content
```
{
  "consumer_key": "...",
  "consumer_secret": "...",
  "access_token": "...",
  "access_token_secret": "..."
}
```
and tweak values coming from https://apps.twitter.com/

## Config keywords
Make sure to set keywords to filter `npm` packages for, in `config/filter.json`, e.g.
```
{
  "name": "react",
  "keywords": ["react"],
  "dep": "react",
  "module": ""
}
```

## Run

`npm run start`

## Tests
Execute tests against `mocks/doc.js`, where you can configure some example packages that should match your keywords

`npm run test`

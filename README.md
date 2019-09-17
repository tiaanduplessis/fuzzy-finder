<div align="center">
  <img width="50%" src="assets/demo.gif" alt=""/>
</div>

# fuzzy-finder

> Tiny fuzzy searcher (Under 300 bytes gzipped)

[![npm package version](https://img.shields.io/npm/v/fuzzy-finder.svg?style=flat-square)](https://npmjs.org/package/fuzzy-finder)
[![npm downloads](https://img.shields.io/npm/dm/fuzzy-finder.svg?style=flat-square)](https://npmjs.org/package/fuzzy-finder)
[![standard JS linter](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![travis ci build status](https://img.shields.io/travis/tiaanduplessis/fuzzy-finder.svg?style=flat-square)](https://travis-ci.org/tiaanduplessis/fuzzy-finder)
[![project license](https://img.shields.io/npm/l/fuzzy-finder.svg?style=flat-square)](https://github.com/tiaanduplessis/fuzzy-finder/blob/master/LICENSE)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Greenkeeper](https://badges.greenkeeper.io/tiaanduplessis/fuzzy-finder.svg)](https://greenkeeper.io)

## Table of Contents

- [fuzzy-finder](#fuzzy-finder)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Install

```sh
$ npm install fuzzy-finder
# OR
$ yarn add fuzzy-finder
```

Or with CDN:

```html
<script src="https://unpkg.com/fuzzy-finder@1.0.4/dist/fuzzy-finder.umd.js"></script>
```

## Usage

```js
import fuzzyFinder from 'fuzzy-finder'

console.log(fuzzy('da', [
    'dota.js',
    'stratures.js',
    'structures.js',
    'database.db',
    'user-data.js',
    'dummy-data.txt',
    'other.js'
]))
// [ { match: 'dota.js', rank: 0 },
//   { match: 'database.db', rank: 0 },
//   { match: 'user-data.js', rank: 5 },
//   { match: 'dummy-data.txt', rank: 0 } ]
```

Check out the example [here](https://codepen.io/tiaan/full/ayYZaM/).

## Contributing

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/tiaanduplessis/fuzzy-finder/issues).

## License

Licensed under the MIT License.

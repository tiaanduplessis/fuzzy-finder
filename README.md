
<div align="center">
  <img width="60%" src="assets/demo.gif" alt=""/>
</div>
<h1 align="center">fuzzy-finder</h1>
<div align="center">
  <strong>Tiny fuzzy searcher (388 Bytes gzipped)</strong>
</div>
<br>
<div align="center">
  <a href="https://npmjs.org/package/fuzzy-finder">
    <img src="https://img.shields.io/npm/v/fuzzy-finder.svg?style=flat-square" alt="npm package version" />
  </a>
  <a href="https://npmjs.org/package/fuzzy-finder">
  <img src="https://img.shields.io/npm/dm/fuzzy-finder.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="standard JS linter" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="prettier code formatting" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/fuzzy-finder">
    <img src="https://img.shields.io/travis/tiaanduplessis/fuzzy-finder.svg?style=flat-square" alt="travis ci build status" />
  </a>
  <a href="https://github.com/tiaanduplessis/fuzzy-finder/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/fuzzy-finder.svg?style=flat-square" alt="project license" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="make a pull request" />
  </a>
    <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/tiaanduplessis/fuzzy-finder.svg" alt="Greenkeeper" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/fuzzy-finder/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/fuzzy-finder.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/fuzzy-finder/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/fuzzy-finder.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20fuzzy-finder!%20https://github.com/tiaanduplessis/fuzzy-finder%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/fuzzy-finder.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="https://github.com/tiaanduplessis">tiaanduplessis</a> and <a href="https://github.com/tiaanduplessis/fuzzy-finder/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

```sh
$ npm install fuzzy-finder
# OR
$ yarn add fuzzy-finder
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

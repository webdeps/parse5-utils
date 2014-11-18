
# parse5-utils

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Low-level parse5 node manipulation utilities.

## API

```js
var utils = require('parse5-utils')
```

### var document = utils.parse(html)

### var fragment = utils.parseFragment(html)

### var html = utils.serialize(document || fragment)

### var attributes = utils.attributesOf(node)

### node.attrs = utils.toAttrs(attributes)

### var node = utils.createNode(tagName)

### var textNode = utils.createTextNode(text)

### node = utils.prepend(parent, node)

### node = utils.append(parent, node)

### node = utils.replace(originalNode, newNode)

### node = utils.remove(node)

[npm-image]: https://img.shields.io/npm/v/parse5-utils.svg?style=flat-square
[npm-url]: https://npmjs.org/package/parse5-utils
[github-tag]: http://img.shields.io/github/tag/webdeps/parse5-utils.svg?style=flat-square
[github-url]: https://github.com/webdeps/parse5-utils/tags
[travis-image]: https://img.shields.io/travis/webdeps/parse5-utils.svg?style=flat-square
[travis-url]: https://travis-ci.org/webdeps/parse5-utils
[coveralls-image]: https://img.shields.io/coveralls/webdeps/parse5-utils.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/webdeps/parse5-utils
[david-image]: http://img.shields.io/david/webdeps/parse5-utils.svg?style=flat-square
[david-url]: https://david-dm.org/webdeps/parse5-utils
[license-image]: http://img.shields.io/npm/l/parse5-utils.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/parse5-utils.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/parse5-utils
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/

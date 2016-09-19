
# parse5-utils

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Low-level parse5 node manipulation utilities.

## API

```js
const utils = require('parse5-utils')
```

### let document = utils.parse(html, [smart])

Parse an HTML string,
If `smart`, returns a `document` or `documentFragment`, appropriately.
Otherwise, always parses it as a document.

### let fragment = utils.parseFragment(html)

Parses HTML as a fragment.

### let html = utils.serialize(document || fragment)

Converts an AST into an HTML string.

### let attributes = utils.attributesOf(node)

Get the attributes of a node as an object.

### setAttribute(node, key, value)

Set an attribute of a node.

### getAttribute(node, key)

Get the attribute of a node.

### node.attrs = utils.toAttrs(attributes)

Set a node's attributes from an object.

### let node = utils.createNode(tagName)

Create a node with a specific tag name.

### let textNode = utils.createTextNode(text)

Create a text node.

### node = utils.prepend(parent, node)

Add a child to a node, making it the first child.

### node = utils.append(parent, node)

Add a child to a node, making it the last child.

### node = utils.replace(originalNode, newNode)

Replace a node with another node.

### node = utils.remove(node)

Remove a node.

### nodes = utils.flatten(node || [nodes])

Get all the nodes in a tree as a flat array.

### let text = utils.textOf(node)

Get the text of a node.

### utils.setText(node, text)

Set the text of a node.

[npm-image]: https://img.shields.io/npm/v/parse5-utils.svg?style=flat-square
[npm-url]: https://npmjs.org/package/parse5-utils
[travis-image]: https://img.shields.io/travis/webdeps/parse5-utils/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/webdeps/parse5-utils
[coveralls-image]: https://img.shields.io/codecov/c/github/codecov/example-python/master.svg?style=flat-square
[coveralls-url]: https://codecov.io/gh/webdeps/parse5-utils
[david-image]: http://img.shields.io/david/webdeps/parse5-utils.svg?style=flat-square
[david-url]: https://david-dm.org/webdeps/parse5-utils
[license-image]: http://img.shields.io/npm/l/parse5-utils.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/parse5-utils.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/parse5-utils

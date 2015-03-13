'use strict'

const assert = require('assert')

const utils = require('..')

describe('.parse(html, smart)', function () {
  it('should return a document if not smart', function () {
    let node = utils.parse('<div></div>')
    assert.equal(node.nodeName, '#document')
  })

  it('should return a fragment if smart', function () {
    let node = utils.parse('<div></div>', true)
    assert.equal(node.nodeName, '#document-fragment')
  })
})

describe('.attributesOf(node)', function () {
  it('should return all the attributes', function () {
    let node = utils
      .parseFragment('<script type="text/javascript" src="file.js" async defer="defer"></script>')
      .childNodes[0]
    let attrs = utils.attributesOf(node)
    assert.equal(attrs.type, 'text/javascript')
    assert.equal(attrs.src, 'file.js')
    assert('async' in attrs)
    assert('defer' in attrs)
  })
})

describe('.toAttrs(obj)', function () {
  it('should return an array of attributes', function () {
    let frag = utils.parseFragment('<link rel="stylesheet">')
    let node = frag.childNodes[0]
    node.attrs = utils.toAttrs({
      rel: 'stylesheet',
      href: 'file.css'
    })
    assert.equal(utils.serialize(frag), '<link rel="stylesheet" href="file.css">')
  })
})

describe('.setAttribute(node, name, value)', function () {
  it('should change an attribute', function () {
    let frag = utils.parseFragment('<link rel="stylesheet">')
    let node = frag.childNodes[0]
    utils.setAttribute(node, 'rel', 'import')
    assert.equal(utils.serialize(frag), '<link rel="import">')
  })

  it('should add an attribute', function () {
    let frag = utils.parseFragment('<link rel="stylesheet">')
    let node = frag.childNodes[0]
    utils.setAttribute(node, 'href', 'file.css')
    assert.equal(utils.serialize(frag), '<link rel="stylesheet" href="file.css">')
  })
})

describe('.createNode(tagName)', function () {
  it('should create a node', function () {
    let frag = utils.parseFragment('')
    frag.childNodes.push(utils.createNode('div'))
    assert.equal(utils.serialize(frag), '<div></div>')
  })
})

describe('.createTextNode(text)', function () {
  it('should create a text node', function () {
    let frag = utils.parseFragment('<div></div>')
    frag.childNodes[0].childNodes.push(utils.createTextNode('lol'))
    assert.equal(utils.serialize(frag), '<div>lol</div>')
  })
})

describe('.prepend(parent, node)', function () {
  it('should prepend a node', function () {
    let frag = utils.parseFragment('<div><a></a></div>')
    utils.prepend(frag.childNodes[0], utils.createNode('br'))
    assert.equal(utils.stringify(frag), '<div><br><a></a></div>')
  })
})

describe('.append(parent, node)', function () {
  it('should append a node', function () {
    let frag = utils.parseFragment('<div><a></a></div>')
    utils.append(frag.childNodes[0], utils.createNode('br'))
    assert.equal(utils.stringify(frag), '<div><a></a><br></div>')
  })
})

describe('.replace(original, node)', function () {
  it('should replace a node', function () {
    let frag = utils.parseFragment('<script></script')
    let script = frag.childNodes[0]
    let text = script.childNodes[0]
    utils.replace(text, utils.createTextNode('a && b'))
    assert.equal(utils.stringify(frag), '<script>a && b</script>')
  })
})

describe('.remove(node)', function () {
  it('should remove a node', function () {
    let frag = utils.parseFragment('<div><a></a></div>')
    utils.remove(frag.childNodes[0])
    assert.equal(utils.stringify(frag), '')
  })
})

describe('.textOf(node)', function () {
  it('should return the text of the node', function () {
    let frag = utils.parseFragment('<div>haha</div>')
    assert.equal(utils.textOf(frag.childNodes[0]), 'haha')
  })
})

describe('.setText(node)', function () {
  it('should set the text of the node', function () {
    let frag = utils.parseFragment('<div>1</div>')
    utils.setText(frag.childNodes[0], 'lol')
    assert.equal(utils.stringify(frag), '<div>lol</div>')
  })
})

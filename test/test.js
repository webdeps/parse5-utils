
var assert = require('assert')

var utils = require('..')

describe('.parse(html)', function () {
  it('should always return a document', function () {
    var node = utils.parse('<div></div>')
    assert.equal(node.nodeName, '#document')
  })
})

describe('.attributesOf(node)', function () {
  it('should return all the attributes', function () {
    var node = utils
      .parseFragment('<script type="text/javascript" src="file.js" async defer="defer"></script>')
      .childNodes[0]
    var attrs = utils.attributesOf(node)
    assert.equal(attrs.type, 'text/javascript')
    assert.equal(attrs.src, 'file.js')
    assert('async' in attrs)
    assert('defer' in attrs)
  })
})

describe('.toAttrs(obj)', function () {
  it('should return an array of attributes', function () {
    var frag = utils.parseFragment('<link rel="stylesheet">')
    var node = frag.childNodes[0]
    node.attrs = utils.toAttrs({
      rel: 'stylesheet',
      href: 'file.css'
    })
    assert.equal(utils.serialize(frag), '<link rel="stylesheet" href="file.css">')
  })
})

describe('.setAttribute(node, name, value)', function () {
  it('should change an attribute', function () {
    var frag = utils.parseFragment('<link rel="stylesheet">')
    var node = frag.childNodes[0]
    utils.setAttribute(node, 'rel', 'import')
    assert.equal(utils.serialize(frag), '<link rel="import">')
  })

  it('should add an attribute', function () {
    var frag = utils.parseFragment('<link rel="stylesheet">')
    var node = frag.childNodes[0]
    utils.setAttribute(node, 'href', 'file.css')
    assert.equal(utils.serialize(frag), '<link rel="stylesheet" href="file.css">')
  })
})

describe('.createNode(tagName)', function () {
  it('should create a node', function () {
    var frag = utils.parseFragment('')
    frag.childNodes.push(utils.createNode('div'))
    assert.equal(utils.serialize(frag), '<div></div>')
  })
})

describe('.createTextNode(text)', function () {
  it('should create a text node', function () {
    var frag = utils.parseFragment('<div></div>')
    frag.childNodes[0].childNodes.push(utils.createTextNode('lol'))
    assert.equal(utils.serialize(frag), '<div>lol</div>')
  })
})

describe('.prepend(parent, node)', function () {
  it('should prepend a node', function () {
    var frag = utils.parseFragment('<div><a></a></div>')
    utils.prepend(frag.childNodes[0], utils.createNode('br'))
    assert.equal(utils.stringify(frag), '<div><br><a></a></div>')
  })
})

describe('.append(parent, node)', function () {
  it('should append a node', function () {
    var frag = utils.parseFragment('<div><a></a></div>')
    utils.append(frag.childNodes[0], utils.createNode('br'))
    assert.equal(utils.stringify(frag), '<div><a></a><br></div>')
  })
})

describe('.replace(original, node)', function () {
  it('should replace a node', function () {
    var frag = utils.parseFragment('<script></script')
    var script = frag.childNodes[0]
    var text = script.childNodes[0]
    utils.replace(text, utils.createTextNode('a && b'))
    assert.equal(utils.stringify(frag), '<script>a && b</script>')
  })
})

describe('.remove(node)', function () {
  it('should remove a node', function () {
    var frag = utils.parseFragment('<div><a></a></div>')
    utils.remove(frag.childNodes[0])
    assert.equal(utils.stringify(frag), '')
  })
})


var assert = require('assert')
var parse5 = require('parse5')

var namespaceURI = 'http://www.w3.org/1999/xhtml'
var parser = exports.parser = new parse5.Parser()
var serializer = exports.serializer = new parse5.Serializer()

exports.parse = function (string) {
  return parser.parse(string)
}

exports.createFragment =
exports.parseFragment = function (string) {
  return parser.parseFragment(string)
}

exports.stringify =
exports.serialize = function (node) {
  return serializer.serialize(node)
}

/**
 * TODO:
 *
 *   - Turn properties into booleans
 */

exports.attributesOf = function (node) {
  var attrs = node.attrs
  var obj = Object.create(null)
  for (var i = 0, l = attrs.length; i < l; i++) {
    var attr = attrs[i]
    obj[attr.name] = attr.value
  }
  return obj
}

exports.toAttrs = function (obj) {
  var attrs = [];
  Object.keys(obj).forEach(function (key) {
    attrs.push({
      name: key,
      value: obj[key]
    })
  })
  return attrs
}

exports.setAttribute = function (node, key, value) {
  var attrs = node.attrs = node.attrs || []

  // change the attribute
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i]
    if (attr.name !== key) continue
    attr.value = value
    return node
  }

  // add the attribute
  attrs.push({
    name: key,
    value: value
  })
  return node
}

exports.createNode = function (tagName) {
  return {
    nodeName: tagName,
    tagName: tagName,
    attrs: [],
    namespaceURI: namespaceURI,
    childNodes: []
  }
}

exports.createTextNode = function (text) {
  return {
    nodeName: '#text',
    value: text
  }
}

exports.prepend = function (parent, node) {
  node.parentNode = parent
  parent.childNodes.unshift(node)
  return node
}

exports.append = function (parent, node) {
  node.parentNode = parent
  parent.childNodes.push(node)
  return node
}

exports.replace = function (original, node) {
  var children = original.parentNode.childNodes
  var index = children.indexOf(original)
  if (!~index) return
  node.parentNode = original.parentNode
  children.splice(index, 1, node)
  return node
}

exports.remove = function (node) {
  var children = node.parentNode.childNodes
  var index = children.indexOf(node)
  if (~index) children.splice(index, 1)
  return node
}

exports.textOf = function (node) {
  var childNodes = node.childNodes
  if (!childNodes.length) return ''
  assert.equal(childNodes.length, 1, 'wtf')
  var child = childNodes[0]
  assert.equal(child.nodeName, '#text')
  return child.value || ''
}

exports.setText = function (node, text) {
  node.childNodes = [exports.createTextNode(text || '')]
  return node
}

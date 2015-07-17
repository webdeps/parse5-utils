'use strict'

const assert = require('assert')
const parse5 = require('parse5')

const namespaceURI = 'http://www.w3.org/1999/xhtml'
const parser = exports.parser = new parse5.Parser()
const serializer = exports.serializer = new parse5.Serializer()

exports.parse = function (string, smart) {
  if (smart && !isDocument(string)) return exports.parseFragment(string)
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
  let attrs = node.attrs
  if (!attrs) return {}
  let obj = Object.create(null)
  for (let i = 0, l = attrs.length; i < l; i++) {
    let attr = attrs[i]
    obj[attr.name] = attr.value
  }
  return obj
}

exports.toAttrs = function (obj) {
  let attrs = []
  Object.keys(obj).forEach(function (key) {
    attrs.push({
      name: key,
      value: obj[key],
    })
  })
  return attrs
}

exports.setAttribute = function (node, key, value) {
  let attrs = node.attrs = node.attrs || []

  // change the attribute
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name !== key) continue
    attr.value = value
    return node
  }

  // add the attribute
  attrs.push({
    name: key,
    value: value,
  })
  return node
}

exports.getAttribute = function (node, key) {
  let attrs = node.attrs || []
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === key) return attr.value
  }
}

exports.createNode = function (tagName) {
  return {
    nodeName: tagName,
    tagName: tagName,
    attrs: [],
    namespaceURI: namespaceURI,
    childNodes: [],
  }
}

exports.createTextNode = function (text) {
  return {
    nodeName: '#text',
    value: text,
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
  let children = original.parentNode.childNodes
  let index = children.indexOf(original)
  if (!~index) return
  node.parentNode = original.parentNode
  children.splice(index, 1, node)
  return node
}

exports.remove = function (node) {
  let children = node.parentNode.childNodes
  let index = children.indexOf(node)
  if (~index) children.splice(index, 1)
  return node
}

exports.textOf = function (node) {
  let childNodes = node.childNodes
  if (!childNodes.length) return ''
  assert.equal(childNodes.length, 1, 'wtf')
  let child = childNodes[0]
  assert.equal(child.nodeName, '#text')
  return child.value || ''
}

exports.setText = function (node, text) {
  node.childNodes = []
  exports.append(node, exports.createTextNode(text || ''))
  return node
}

exports.isDocument = isDocument
function isDocument(string) {
  return /^\s*<(!doctype|html|head|body)\b/i.test(string)
}

exports.flatten = function flatten(node, arr) {
  arr = arr || []

  let children = Array.isArray(node)
    ? node
    : node.childNodes

  if (!children) return arr

  for (let child of children) {
    arr.push(child)
    flatten(child, arr)
  }

  return arr
}

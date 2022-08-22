'use strict'

import test from 'ava'
import fn from '.'

// failures
test('zero-0', t => {
  const { url, email, error } = fn()
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-1', t => {
  const { url, email, error } = fn(' ')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-2', t => {
  const { url, email, error } = fn('.')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-2b', t => {
  const { url, email, error } = fn('gg.')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero', t => {
  const { url, email, error } = fn('joe@bob.ca/john')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-4', t => {
  const { url, email, error } = fn('bob')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

test('zero-5', t => {
  const { url, email, error } = fn('Public Profilehttps://www.linkedin.com/in')
  t.truthy(error)
  t.falsy(url)
  t.falsy(email)
})

// successes
test('url with path, missing http', t => {
  const { url, email, error } = fn('bob.ca')
  t.falsy(error)
  t.is(url, 'http://bob.ca')
  t.falsy(email)
})

test('url with path, with http (v2)', t => {
  const { url, email, error } = fn('http://bob.ca')
  t.falsy(error)
  t.is(url, 'http://bob.ca')
  t.falsy(email)
})

test('url with path, with https', t => {
  const { url, email, error } = fn('https://bob.ca')
  t.falsy(error)
  t.is(url, 'https://bob.ca')
  t.falsy(email)
})

test('url with path, missing http (v3)', t => {
  const { url, email, error } = fn('bob.ca/joe')
  t.falsy(error)
  t.is(url, 'http://bob.ca/joe')
  t.falsy(email)
})

test('url: lowercase domain', t => {
  const { url, email, error } = fn('Bob.ca/joe')
  t.falsy(error)
  t.is(url, 'http://bob.ca/joe')
  t.falsy(email)
})

test('url: lowercase domain, cased path', t => {
  const { url, email, error } = fn('Bob.ca/Joe')
  t.falsy(error)
  t.is(url, 'http://bob.ca/Joe')
  t.falsy(email)
})

test('url containing a @ in the path', t => {
  const { url, email, error } = fn('bob.ca/joe@john')
  t.falsy(error)
  t.is(url, 'http://bob.ca/joe@john')
  t.falsy(email)
})

test('plain email', t => {
  const { url, email, error } = fn('joe@bob.ca')
  t.falsy(error)
  t.falsy(url)
  t.is(email, 'joe@bob.ca')
})

test('idn url fixed', t => {
  const { url, email, error } = fn('www.êxample.com')
  t.falsy(error)
  t.is(url, 'http://www.xn--xample-hva.com')
  t.falsy(email)
})

test('idn email', t => {
  const { url, email, error } = fn('joe@xn--xample-hva.com')
  t.falsy(error)
  t.falsy(url)
  t.is(email, 'joe@xn--xample-hva.com')
})

test('idn url', t => {
  const { url, email, error } = fn('http://xn--xample-hva.com')
  t.falsy(error)
  t.is(url, 'http://xn--xample-hva.com')
  t.falsy(email)
})

test('tiny url', t => {
  const { url, email, error } = fn('g.g')
  t.falsy(error)
  t.is(url, 'http://g.g')
  t.falsy(email)
})

// FIXME: should not error, êxample should be "punycoded"
test.skip('idn email fixed', t => {
  const { url, email, error } = fn('joe@www.êxample.com')
  t.falsy(error)
  t.falsy(url)
  t.is(email, 'joe@xn--xample-hva.com')
})

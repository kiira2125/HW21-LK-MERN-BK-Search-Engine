'use strict'

// woot

const normalizeEmail = require('normalize-email')
const normalizeUrl = require('normalize-url')

const run = str => {
  if (!str) {
    return { error: 'missing param' }
  }
  str = str.trim()

  if (str.split('.').filter(Boolean).length < 2) {
    return { error: 'need something on both sides of the "."' }
  }

  const pAt = str.indexOf('@')
  const pSlash = str.indexOf('/')
  const bothAtSlash = pAt !== -1 && pSlash !== -1

  try {
    if (bothAtSlash && pSlash < pAt) {
      return { url: normalizeUrl(str, { stripWWW: false }) }
    }

    const [name, domain] = str.replace(/^mailto:/, '').split('@')

    if (!domain) {
      return { url: normalizeUrl(str, { stripWWW: false }) }
    }

    if (bothAtSlash && pAt < pSlash) {
      return { error: 'bad email (/)' }
    }

    const email = normalizeEmail(`${name}@${domain}`)
    const [nameNormalized] = email.split('@')
    const d = normalizeUrl(domain, { stripWWW: false }).slice(7)
    if (email === `${nameNormalized}@${d}`) {
      return { email }
    } else {
      // FIXME: should not error, êxample should be "punycoded"
    }

    // see test "idn email fixed"
    // should never be reached
    return { error: 'unexpected error' }
  } catch (error) {
    return { error }
  }
}

module.exports = run

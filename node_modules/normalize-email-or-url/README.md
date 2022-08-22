# normalize-email-or-url

> Return normalized email or url from a string.

## Installation

```sh
npm install normalize-email-or-url --save
```

or

```sh
yarn add normalize-email-or-url
```

## Usage

```js
const norm = require('normalize-email-or-url')

const { url, error } = norm('example.com')
// => url = http://example.com

const { email, error } = norm('joe@example.com')
// => email = joe@example.com
```

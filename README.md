<div align="center">

<h1 id="toc">i18n.macro</h1>

<code>🚧 Under Development</code>

<p>Allows to translate at compile-time.</p>

<code>t\`message\`</code>

↓ ↓ ↓ ↓ ↓ ↓

`"hello world"`

<p align="center">
  <a href="#features">Features</a>  • 
  <a href="#getting-started">Getting Started</a>  • 
  <a href="#examples">Examples</a>  • 
  <a href="#contributors">Contributors</a> 
</p>

</div>

---

<div align="center">

<!-- prettier-ignore-start -->

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/r17x/i18n.macro/release/main)](https://github.com/r17x/i18n.macro/actions/workflows/release.yml?query=branch%3Amain+)
[![Codecov branch](https://img.shields.io/codecov/c/github/r17x/i18n.macro/main)](https://app.codecov.io/gh/r17x/i18n.macro)
[![npm](https://img.shields.io/npm/v/i18n.macro)](https://www.npmjs.com/package/i18n.macro/v/latest)
[![npm downloads](https://img.shields.io/npm/dw/i18n.macro)](https://www.npmjs.com/package/i18n.macro/v/latest)
[![License](https://img.shields.io/github/license/r17x/i18n.macro)](https://github.com/r17x/i18n.macro/blob/main/LICENSE)
[![GitHub contributors (via allcontributors.org)](https://img.shields.io/github/all-contributors/r17x/i18n.macro/main)](https://github.com/r17x/i18n.macro#contributors)

<!-- prettier-ignore-end -->

</div>

## Features

- [ ] ♻︎ Translate a key to text (`t.message` → `heLLo wOrLd`)

## Getting Started

### Installation

[\[Back to the Table of Contents\] ↑](#toc)

- yarn
  - `yarn add -DE i18n.macro`
- npm
  - `npm -i --save-dev i18n.macro`

### Examples

### t

it will be translate a key in t literal text from source

<table>
<tr>
<td>Input</td>
<td>Output</td>
</tr>
<tr>
<td>

```javascript
import { t } from "i18n.macro";
const greeting = t`message`;
```

</td>

<td>

```javascript
const greeting = "hello world";
```

</td>
</tr>
</table>

### t

it will be translate a key in t literal text from source

<table>
<tr>
<td>Input</td>
<td>Output</td>
</tr>
<tr>
<td>

```javascript
import { t } from "i18n.macro";
const greeting = t`message`;
```

</td>

<td>

```javascript
const greeting = "hello world";
```

</td>
</tr>
</table>

## Contributors

[\[Back to the Table of Contents\] ↑](#toc)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

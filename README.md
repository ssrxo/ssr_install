<img align="right" src="https://i.loli.net/2019/12/16/3qgIYT2kz4QcNpu.png">

### ssr_install

use `ssr` python version.

#### install

```bash
npm i --save ssr_install
```

#### Use

```js
const ssr = require('ssr_install')

;(async ()=> {
  const options = {
    path: process.cwd(),
    dirname: `ssr`
  }
  const ssrClient = new ssr(options)

  // install
  ssrClient.install()
  // check
  ssrClient.check()

  // static install
  ssr.install(options)
  // static check
  ssr.check(options)
})()
```

the default mirror repo by: [shadowsocksrr/shadowsocksr#akkariiin/master](https://github.com/shadowsocksrr/shadowsocksr)

If the download fails, try another repository

```js
const ssr = require('ssr_install')

;(async ()=> {
  const options = {
    path: process.cwd(),
    dirname: `ssr`
  }
  const ssrClient = new ssr(options)
  ssrClient.mirror = [
    // The default is to [0]
  ]
  await ssrClient.install()
})
```
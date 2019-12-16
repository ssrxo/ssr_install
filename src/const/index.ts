import os from 'os'

// default install path
export const defaultDir: string = os.homedir()

// default install dir name
export const defaultDirName: string = `ssr`

// download ssr mirror list
// source by: https://github.com/d1y/electron-ssr/blob/master/src/main/ipc.js
export const mirror: string[] = [
  "shadowsocksrr/shadowsocksr#akkariiin/master"
]
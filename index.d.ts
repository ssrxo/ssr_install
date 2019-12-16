/*
** create by @d1y in 2019-12-16
*/

export interface installInterface {
  // install path
  path: string
  // install path in dir
  dirname: string
}

export interface installReturnInterface {
  // [fix] python hooks run ./shadowsocks/local.py
  localPy?: string
  isSucess: boolean
}

declare class ssrInstall {

  full_path: string
  base_path: string
  dirname: string
  localPy: string
  mirror: string[]

  constructor(conf: installInterface)

  checkSSRMainPath(): boolean
  checkLocalPyFile(): boolean

  install(): Promise<installReturnInterface | false>
  check(): boolean

  static check(config: installInterface): boolean
  static install(config: installInterface): Promise<installReturnInterface | boolean>

}

export default ssrInstall

export declare function check(config: installInterface): Promise<installReturnInterface | boolean>

export declare function install(config: installInterface): Promise<installReturnInterface | boolean>
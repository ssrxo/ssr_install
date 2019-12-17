/*
** create by @d1y in 2019-12-16
*/

import { installInterface, installReturnInterface } from "./interface"
import { defaultDir, defaultDirName, mirror } from "./const"
import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'

const download = require('download-git-repo')

export default class ssrInstall {

  public full_path: string
  public base_path: string
  public dirname: string
  public localPy: string
  public mirror: string[] = mirror

  constructor(conf: installInterface = {
    path: defaultDir,
    dirname: defaultDirName
  }) {
    const { path: dir, dirname } = conf
    const full_path = path.join(dir, dirname)
    if (!fs.existsSync(full_path)) {
      try {
        mkdirp.sync(full_path)
      } catch (error) {
        console.log('error: ', error)
      }
    }
    this.full_path = full_path
    this.base_path = dir
    this.dirname = dirname
    this.localPy = path.join(full_path, './shadowsocks/local.py')
  }

  public checkSSRMainPath = (): boolean => {
    const full_path = this.full_path
    return fs.existsSync(full_path)
  }

  public checkLocalPyFile = (): boolean => {
    const localPy = this.localPy
    return fs.existsSync(localPy)
  }

  public install = async (): Promise<installReturnInterface | boolean>=> {
    let error: boolean = false
    const github: string = (this.mirror as any)[0]
    try {
      error = await new Promise(rcv=> {
        download(github, this.full_path, (status: any) => {
          console.log('状态: ', status)
          rcv(status ? false : true)
        })
      })
    } catch (error) {
      console.log('downlaod fadild: ', error)
      error = true
    }
    if (error) return false
    
    const Return: installReturnInterface = {
      localPy: this.localPy,
      isSucess: false
    }
    Return['isSucess'] = !error
    return Return
  }

  public check = (): boolean => {
    const main = this.checkSSRMainPath()
    const local = this.checkLocalPyFile()
    return (main && local)
  }

  static install = async (config: installInterface): Promise<installReturnInterface | boolean> => {
    const Install: ssrInstall = new ssrInstall(config)
    const test = await Install.install()
    return test
  }

  static check = (config: installInterface): boolean => {
    const test: ssrInstall = new ssrInstall(config)
    return test.check()
  }

}

// check `ssr` installed
export const check = async (config: installInterface): Promise<installReturnInterface | boolean> => {
  return (await ssrInstall.check(config))
}

// `ssr` install
export const install = async (config: installInterface): Promise<installReturnInterface | boolean> => {
  return (await ssrInstall.install(config))
}

// ;(async ()=> {
//   const options = {
//     path: process.cwd(),
//     dirname: `wrapper`
//   }
//   console.log(await ssrInstall.check(options))
// })()
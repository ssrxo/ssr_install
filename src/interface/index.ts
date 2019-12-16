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
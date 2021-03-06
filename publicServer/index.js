#!/usr/bin/env node

const fs = require('fs')
const url = require('url')
const http = require('http')
const path = require('path')
const zlib = require('zlib')
const wwwroot = '/home/admin/wwwroot'
const mimeType = {
  '.ico': 'image/x-icon',
  '.md': 'text/plain',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(wwwroot, pathname)
  const ext = path.extname(pathname)
  // 参数合法性校验  
  // 1. 非允许后缀的资源不予返回
  if (!mimeType[ext]) {
    res.writeHead(404)
    return res.end()
  }
  // 2. 若后缀合法，判断文件是否存在
  if (!fs.existsSync(filePath)) {
    return (res.statusCode = 404)
  }
  // 3. 若文件存在，判断是否是文件类型
  const fStat = fs.statSync(filePath)
  if (!fStat.isFile()) {
    return (res.statusCode = 404)
  }
  // 4. 若合法存在，判断是否位于 wwwroot 目录下
  if (!filePath.startsWith(wwwroot)) {
    return (res.statusCode = 404)
  }

  // 5. 304 缓存有效期判断, 使用 If-Modified-Since，用 Etag 也可以
  const modified = req.headers['if-modified-since']
  const expectedModified = new Date(fStat.mtime).getTime()
  if (modified && modified == expectedModified) {
    res.statusCode = 304
    res.setHeader('Content-Type', mimeType[ext])
    res.setHeader('Cache-Control', 'max-age=3600')
    res.setHeader('Last-Modified', new Date(expectedModified).toGMTString())
    return
  }

  // 6. 文件头信息设置
  res.statusCode = 200
  res.setHeader('Content-Type', mimeType[ext])
  res.setHeader('Cache-Control', 'max-age=3600')
  res.setHeader('Content-Encoding', 'gzip')
  res.setHeader('Last-Modified', new Date(expectedModified).toGMTString())

  // 7. gzip 压缩后，把文件流 pipe 回去
  const stream = fs.createReadStream(filePath, {
    flags: 'r'
  })
  stream.on('error', () => {
    res.writeHead(404)
    res.end()
  })
  stream.pipe(zlib.createGzip()).pipe(res)
})

server.on('error', error => console.log(error))
server.listen(4000, '127.0.0.1')
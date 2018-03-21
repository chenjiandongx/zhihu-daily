const http = require('http')
const path = require('path')
const request = require('request')
const express = require('express')
const serveStatic = require('serve-static')

const hostname = '127.0.0.1'
const port = 8010
const imgPort = 8011

const apiServer = http.createServer((req, res) => {
  const url = 'http://news-at.zhihu.com/api/4' + req.url
  const options = {
    url: url
  }

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(body)
    }
  })
}).listen(port, hostname, () => {
  console.log(`接口代理运行在 http://${hostname}:${port}/`)
})

const imgServer = http.createServer((req, res) => {
  const url = req.url.split('/img/')[1]
  const options = {
    url: url,
    encoding: null
  }

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const contentType = response.headers['content-type']
      res.setHeader('Content-Type', contentType)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.end(body)
    }
  })
}).listen(imgPort, hostname, () => {
  console.log(`图片代理运行在 http://${hostname}:${imgPort}/`)
})


const app = express();
app.use('/', serveStatic(path.join(__dirname, '/dist')));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
}).listen(process.env.PORT || 5000, ()=> {
  console.log('项目启动，部署在 5000 端口');
})

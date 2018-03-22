const http = require('http')
const path = require('path')
const request = require('got')

const hostname = '0.0.0.0'
const port = 8010
const imgPort = 8011

const apiServer = http.createServer((req, res) => {
  const url = 'http://news-at.zhihu.com/api/4' + req.url
  request.get(url).then(response => {
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(response.body)
  }).catch(error => {
  })
}).listen(port, hostname, () => {
  console.log(`接口代理运行在 http://${hostname}:${port}/`)
})

const imgServer = http.createServer((req, res) => {
  const url = req.url.split('/img/')[1]
  request.get(url, {encoding: null}).then(response => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Content-Type', 'image/gif')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(response.body)
  }).catch(error => {
  })

}).listen(imgPort, hostname, () => {
  console.log(`图片代理运行在 http://${hostname}:${imgPort}/`)
})

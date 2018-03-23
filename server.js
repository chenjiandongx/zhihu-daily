const http = require('http');
const path = require('path');
const request = require('got');

const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || 8010;

const apiServer = http.createServer((req, res) => {
  if (req.url.split('/img/')[1] === undefined) {
    const apiUrl = 'http://news-at.zhihu.com/api/4' + req.url;
    request.get(apiUrl).then(response => {
      res.setHeader('Content-Type', 'text/plain;charset=utf8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(response.body);
    }).catch(error => {});
  } else {
    const imgUrl = req.url.split('/img/')[1];
    request.get(imgUrl, { encoding: null }).then(response => {
      res.setHeader('Content-Type', 'image/jpeg')
      res.setHeader('Content-Type', 'image/gif');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(response.body);
    }).catch(error => {});
  }

}).listen(PORT, HOSTNAME, () => {
  console.log(`接口代理运行在 http://${HOSTNAME}:${PORT}/`)
});

const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express()
app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 5000
app.listen(port)
console.log('Server started on port ' + port)

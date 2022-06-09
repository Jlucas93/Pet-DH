const fs = require('fs');
const CRLF = '\r\n'

module.exports = requestLogger = (req, res, next) => {
  const url = req.url
  const date_hour = new Date().toLocaleString().slice(0, -3)
  const request_ip = req.ip.replace('::1', 'localhost')
  const httpReq = req.method
  const httpCode = res.statusCode
  fs.appendFileSync(
    'log.txt',
    [date_hour, request_ip, url, httpReq, httpCode].join(',')
    + CRLF
  )
  next()
}

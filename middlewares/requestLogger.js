const fs = require('fs');
const CRLF = '\r\n'
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
module.exports = requestLogger = (req, _res, next) => {
  const { originalUrl } = req
  const date_hour = new Date().toLocaleString().slice(0, -3)
  const request_ip = req.ip.replace('::1', 'localhost')
  fs.appendFileSync(
    'log.txt',
    [date_hour, request_ip, originalUrl].join(' ')
    + CRLF
  )
  next()
}

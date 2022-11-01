const express = require('express')
const rTracer = require('cls-rtracer')
const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const controller = require('./controller')
const logger = require('./logger')
const morgan = require('morgan')
// app.use(rTracer.expressMiddleware())
// app.use(logger.info)

app.use(
    morgan(
        'ip: :remote-addr\ndate: :date[iso]\npage: :referrer\nmethod: :method\nurl: :url\nstatus: :status',
        { stream: logger.winstonLogger.stream }
    )
)
app.get('/', controller.controller)

// app.use(logger.error)

app.listen(port, () => {
    console.log(`start http://${host}:${port}`)
})

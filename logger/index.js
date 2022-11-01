const logger = require('./logger')
const WinstonLogger = require('./WinstonLogger')
module.exports = {
    info: (req, res, next) => {
        const {
            method,
            path,
            url,
            query,
            headers: { cookie },
            body,
        } = req

        const request = {
            method,
            path,
            cookie,
            body,
            url,
            query,
        }
        logger.info({ request })
        next()
    },
    error: (error, req, res, next) => {
        const {
            method,
            path,
            url,
            query,
            headers: { cookie },
            body,
        } = req

        const request = {
            method,
            path,
            cookie,
            body,
            url,
            query,
        }
        const { status, message, result } = error
        const response = { status, message }
        logger.error({ request, response })
        res.status(error.status).json({
            result,
            message,
        })
    },
    winstonLogger: new WinstonLogger(),
}

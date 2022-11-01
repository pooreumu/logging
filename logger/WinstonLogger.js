const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf, colorize } = format
require('winston-daily-rotate-file')
const logDir = 'logs'

module.exports = class WinstonLogger {
    constructor() {
        this.format = combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            label({ label: 'logger-prac' }),

            printf((info) => {
                return `<${info.label}> ${info.timestamp} - ${info.level} : ${info.message}`
            })
        )
        this.logger = createLogger({
            format: this.format,
            transports: [
                new transports.DailyRotateFile({
                    level: 'info',
                    datePattern: 'YY-MM-DD',
                    dirname: logDir + '/info',
                    filename: `%DATE%.info.log`,
                    maxFiles: 30, // 최대 저장일수
                }),
                new transports.DailyRotateFile({
                    level: 'warn',
                    datePattern: 'YY-MM-DD',
                    dirname: logDir + '/warn',
                    filename: `%DATE%.warn.log`,
                    maxFiles: 30, // 최대 저장일수
                }),
                new transports.DailyRotateFile({
                    level: 'error',
                    datePattern: 'YY-MM-DD',
                    dirname: logDir + '/error',
                    filename: `%DATE%.error.log`,
                    maxFiles: 30, // 최대 저장일수
                }),
            ],
        })
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(
                new transports.Console({
                    format: combine(colorize({ all: true }), this.format),
                })
            )
        }
    }
    stream = {
        write: (message) => {
            const obj = {}
            message.split('\n').map((v) => {
                if (v === '') return
                const [key, value] = v.split(': ')
                obj[key] = value
            })
            const status = obj.status
            const level =
                +status < 400 ? 'info' : +status < 500 ? 'warn' : 'error'

            this.logger.log(level, JSON.stringify(obj))
        },
    }
}

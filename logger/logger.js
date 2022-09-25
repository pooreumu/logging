// 파일 저장만

const tracer = require('tracer')
const rTracer = require('cls-rtracer')

const logger_info = tracer.dailyfile({
    root: './logs',
    allLogsFileName: 'info', // [allLogsFileName].[날짜].log 파일에 추가
    format: '{{timestamp}} <{{title}}> ({{file}}:{{line}}) {{message}}',
    dateformat: 'yyyy-mm-dd HH:MM:ss',
})

const logger = {
    info(...trace) {
        return logger_info.info(rTracer.id(), ...trace)
    },
    error(...trace) {
        return logger_info.error(rTracer.id(), ...trace)
    },
}

module.exports = logger

// console + 파일

// const fs = require('fs')
// const tracer = require('tracer')
// const rTracer = require('cls-rtracer')

// const logger = tracer.colorConsole({
//     format: [
//         '{{timestamp}} <{{title}}> ({{file}}:{{line}}) {{message}}', // default format
//         {
//             error: '{{timestamp}} <{{title}}> ({{file}}:{{line}}) {{message}}\nCall Stack:\n{{stack}}', // error format
//         },
//     ],
//     dateformat: 'yyyy-mm-dd HH:MM:ss',
//     transport: (data) => {
//         console.log(data.output)
//         fs.appendFile(
//             './logs/server.log',
//             `${rTracer.id()} ${data.rawoutput}\n`,
//             (err) => {
//                 if (err) throw err
//             }
//         )
//     },
// })

// module.exports = logger

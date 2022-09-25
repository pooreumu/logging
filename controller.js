const service = require('./service')
module.exports = {
    controller: async (req, res, next) => {
        try {
            const data = 'data'
            const result = await service.service(data)
            res.status(200).json({
                result: 'good',
                message: '성공',
            })
        } catch (error) {
            if (error instanceof Error) {
                next({
                    status: 400,
                    result: 'fail',
                    message: error.message,
                })
            } else {
                next({
                    status: 500,
                    result: 'fail',
                    message: '알수없는 에러',
                })
            }
        }
    },
}

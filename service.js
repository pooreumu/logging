const db = require('./db')
module.exports = {
    service: async (data) => {
        try {
            const result = await db.create(data)
            return result
        } catch (error) {
            throw error
        }
    },
}

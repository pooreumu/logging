module.exports = {
    create: async (data) => {
        try {
            throw new Error('db에서')
            return 'success'
        } catch (error) {
            throw error
        }
    },
}

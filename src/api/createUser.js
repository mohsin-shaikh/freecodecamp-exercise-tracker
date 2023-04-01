const { pocketBaseAxios } = require('../utils/axios')
const logger = require('../utils/logger')


const createUser = async (req, res) => {
    logger.info('createUser Start')

    const username = req.body.username
    const { data } = await pocketBaseAxios.post('/collections/users/records', {
        username: username
    })

    return res.status(200).json({
        username: data.username,
        _id: data.id
    })
}

module.exports = createUser

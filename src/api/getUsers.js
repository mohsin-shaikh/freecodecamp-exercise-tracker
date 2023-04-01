const { pocketBaseAxios } = require('../utils/axios')
const logger = require('../utils/logger')


const getUsers = async (req, res) => {
    logger.info('getUsers Start')

    const { data } = await pocketBaseAxios.get(`/collections/users/records`)

    return res.status(200).json(data.items.map((d, i)  => {
        return {
            _id: d.id,
            username: d.username
        }
    }))
}

module.exports = getUsers

const { pocketBaseAxios } = require('../utils/axios')
const logger = require('../utils/logger')
const qs = require('qs')


const getUserLogs = async (req, res) => {
    logger.info('getUserLogs Start')

    const _id = req.params._id
    const to = req.query.to
    const from = req.query.from
    const limit = req.query.limit ?? 30

    const { data } = await pocketBaseAxios.get(`/collections/logs/records`, {
        params: {
            filter: `(user='${_id}'${from ? `&&date>'${from}'` : ''}${to ? `&&date<'${to}'` : ''})`,
            expand: 'user',
            perPage: limit
        }
    })

    return res.status(200).json({
        _id: data.items[0].expand.user.id,
        username: data.items[0].expand.user.username,
        from: from,
        to: to,
        count: data.items.length,
        log: data.items.map((d, i) => {
            return {
                description: d.description,
                duration: d.duration,
                date: (new Date(d.date).toDateString()),
            }
        })
    })
}

module.exports = getUserLogs

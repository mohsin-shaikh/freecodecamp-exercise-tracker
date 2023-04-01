const { pocketBaseAxios } = require('../utils/axios')
const logger = require('../utils/logger')


const createUserExercise = async (req, res) => {
    logger.info('createUserExercise Start')

    const userId = req.params._id
    const description = req.body.description
    const duration = req.body.duration
    const date = req.body.date ? (new Date(req.body.date).toISOString()) : (new Date().toISOString())
    const { data } = await pocketBaseAxios.post('/collections/exercises/records', {
        user: userId,
        description: description,
        duration: duration,
        date: date
    }, {
        params: {
            expand: 'user'
        }
    })
    logger.info(JSON.stringify(data))

    const { logData } = await pocketBaseAxios.post('/collections/logs/records', {
        user: userId,
        description: description,
        duration: duration,
        date: date
    })

    return res.status(200).json({
        username: data.expand.user.username,
        description: data.description,
        duration: data.duration,
        date: (new Date(data.date).toDateString()),
        _id: data.user
    })
}

module.exports = createUserExercise

const { successResponse, uniqueId } = require('../utils/helper')
const logger = require('../utils/logger')


const ping = (req, res) => {
    logger.info('Ping Start')
    const response = successResponse({
        req, res,
        data: {
            ping: 'pong',
            uuid: uniqueId(40),
            timestamp: Date.now()
        },
        statusCode: 200
    })
    logger.info(`Response: ${JSON.stringify(response)}`)
    return res.status(response.statusCode).json(response)
}

module.exports = ping;

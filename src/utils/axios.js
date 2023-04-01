const axios = require('axios');
const { api } = require('../config/vars');


// Common config
axios.defaults.headers.post['Content-Type'] = 'application/json';

const pocketBaseAxios = axios.create({
    baseURL: `${api.host}/api`,
})

module.exports = {
    pocketBaseAxios
}

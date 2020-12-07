const axios = require('axios')
const config = require('../config/config')
axios.defaults.headers = { Authorization: 'Token ' + config.Token, "Accept": "application / vnd.github.v3 + json" }



// eslint-disable-next-line import/no-anonymous-default-export
export default async function (text) {
  const result = await axios.post('https://api.github.com/markdown', { text })
  console.log(result);
  return result
}
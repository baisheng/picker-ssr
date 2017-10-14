const isProdMode = Object.is(process.env.NODE_ENV, 'production')
module.exports = {
  baseURL: isProdMode ? 'https://api.picker.cc/v1' : 'http://api.picker.la/v1',
  socketHost: isProdMode ? 'https://picker.cc' : 'http://localhost:5000'
}

const isProdMode = Object.is(process.env.NODE_ENV, 'production')
module.exports = {
  baseURL: isProdMode ? 'https://api.picker.cc/org' : 'http://api.picker.la/rest/org',
  socketHost: isProdMode ? 'https://picker.cc' : 'http://localhost:5000'
}

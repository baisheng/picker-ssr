const isProdMode = Object.is(process.env.NODE_ENV, 'production')
module.exports = {
  baseURL: isProdMode ? 'https://api.picker.cc/orgs' : 'http://api.picker.la/rest/orgs',
  socketHost: isProdMode ? 'https://picker.cc' : 'http://localhost:5000'
}

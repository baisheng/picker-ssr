export default {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

  setCssText: function (obj) {
    const cssArr = [];
// eslint-disable-next-line guard-for-in
    for (let key in obj) {
      let val = obj[key];
      if (typeof val === 'number') {
        val = '' + val + 'px';
      }
      cssArr.push(key + ': ' + val + ';');
    }
    return cssArr.join('');
  }
};

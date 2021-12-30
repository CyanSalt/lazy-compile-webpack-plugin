const loaderUtils = require('loader-utils');
const apiPath = require.resolve('./api.js');

module.exports = function() {
  const { activationUrl, ips } = loaderUtils.getOptions(this) || {};
  const apiRequest = loaderUtils.stringifyRequest(this, `!!${apiPath}`);

  return `
// @activationUrl ${activationUrl}

var api = require(${apiRequest});
api.compile(${JSON.stringify(ips)}, '${activationUrl}');

if (api.isBrowser) {
  setTimeout(function () {
    window.location.reload()
  }, 0)
}
`.trim();
};

/* eslint quote-props: 0 */

const configuration = {};
configuration.mongo = {
  url: process.env.MONGOURL,
};
configuration.facebook = {
  client_id: process.env.CLIENTID,
  client_secret: process.env.CLIENTSECRET,
  callback_url: process.env.CALLBACK
};
module.exports = configuration;

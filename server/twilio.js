const twilio = require('twilio');

const accountSid = 'ACc52e8add86d970e48030a27e6b785a0c';
const authToken = '7cba068948c520ab1a6d99ae5c70bd0e'

console.log(`Account SID: ${accountSid}`);
console.log(`Auth Token: ${authToken}`);

const client = new twilio(accountSid, authToken);

module.exports = client;

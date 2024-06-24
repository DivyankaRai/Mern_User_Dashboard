const twilio = require('twilio');

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token'

console.log(`Account SID: ${accountSid}`);
console.log(`Auth Token: ${authToken}`);

const client = new twilio(accountSid, authToken);

module.exports = client;

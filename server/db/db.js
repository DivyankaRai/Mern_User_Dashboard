const mongoose = require('mongoose')
const DB = process.env.DATABASE
mongoose.set('strictQuery', false)

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

console.log(`Account SID: ${accountSid}`);
console.log(`Auth Token: ${authToken}`);


mongoose.connect(DB,{
}).then(()=>console.log("db connected")).catch((er)=>console.log(er))
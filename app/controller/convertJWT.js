const sign = require('jwt-encode');
const secret = "secret";

async function handle(token) {
   return sign(token, secret);
}

module.exports = {
   handle
}
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

let token = jwt.sign(data, '123abc');

console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log(decoded);

let message = 'fill me in';
let hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);


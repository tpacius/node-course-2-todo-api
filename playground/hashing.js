const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc';

// let salt = bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

let hashed = '$2a$10$r5bxSdmNMmG/E4TNQMnlCu/YDB2sLiBrHRkDaLLWAqMUJjD3bow0q';

bcrypt.compare(password, hashed, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc');

// console.log(token);

// let decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// let message = 'fill me in';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


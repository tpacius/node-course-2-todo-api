const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove()

//Todo.findByIdAndRemove()

// Todo.findOneAndRemove('5c2f9ac68777fe3653e4ea55').then((todo) => {
//     console.log(todo);
// });
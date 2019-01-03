const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// let id = '5c2e5bfb2f660f82c891ec65';
let userId = '5c11b67731ce4f88c8766eeb';

// if(!ObjectID.isValid(id)) {
//     console.log('This is an invalid Id')
// }

if(!ObjectID.isValid(userId)) {
    console.log('This is an invalid user id');
}

// Todo.find({
//    _id: id 
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id 
//     }).then((todo) => {
//         console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//     return console.log('Id not found');
//     } console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

//User.findById()
User.findById(userId).then((user => {
    if(!user) {
        return console.log('User was not found');
    } console.log('User' , user.email, 'was found');
    }));

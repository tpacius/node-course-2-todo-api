// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectID('5c107247aa2b8fd87641f901')}, 
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
            name: 'Frank'
        },
        {
            $set: {
                name: 'Timothy'
            },
            $inc: {
                age: 1
            }
        }).then((result) => {
            console.log(result);
    });

    // client.close();
});
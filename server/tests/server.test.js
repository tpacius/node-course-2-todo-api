const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    _id: new ObjectId(),
    text: 'Test todo 1'
}, {
    _id: new ObjectId(),
    text: 'Test todo 2',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => 
    {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Testing todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
    it('should not create todo with bad data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    it('should return a 404 if not found', (done) => {
        let falseId = new ObjectId().toHexString();
        request(app)
        .get(`/todos/${falseId}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 for invalid', (done) => {
        request(app)
        .get(`/todos/12345`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();
        
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return 404 if no todo found', (done) => {
        let falseId = new ObjectId().toHexString();
        request(app)
        .delete(`/todos/${falseId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete(`/todos/12345`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexId = todos[0]._id.toHexString();

        let updatedText =  'Updated text';
        
        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: true,
            text: updatedText
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(updatedText);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeTruthy();
        })
        .end(done);
        });
        it('should clear completedAt when todo is not completed', (done) => {

            let hexId = todos[1]._id.toHexString();
    
            let updatedText =  'Updated text';
            request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text: updatedText
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(updatedText);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
        });
    });

import request from 'supertest'
import app from '../src/app.js'
import { Task } from '../src/db/models/tasks.js'

import { userOne, userOneId ,userTwo, TaskOne,setupDatabase } from './fixtures/db.js'

beforeEach(async ()=>{
    await setupDatabase()
})

test('Should create task for user',async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'Shut the door',
            completed:true
        })
        .expect(201)
    const task = await Task.findById(response.body._id)    
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(true)
})

test('Should Get user Tasks', async ()=> {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)   
        .send()     
        .expect(200)
    expect(response.body.length).toEqual(2)    
})

test('Should not delete the task by invalid user', async ()=> {
    await request(app)
        .delete(`/tasks/${TaskOne._id}`)
        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)   
        .send()     
        .expect(404)
    const task = await Task.findById(TaskOne._id)
    expect(task).not.toBeNull()    
})
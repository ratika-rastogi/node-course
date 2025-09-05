import request from 'supertest'
import app from '../src/app.js'
import { User } from '../src/db/models/users.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userOneId = new mongoose.Types.ObjectId()
const userOne={
    _id:userOneId,
    name:'Test User',
    email:'test@example.com',
    password:'passCode!!',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('should sign up a new user', async () =>{
    const response = await request(app).post('/users').send({
        name:'Shashank Rastogi',
        email:'shashankrastogi125@gmail.com',
        password:'shashank@123'
    }).expect(201)

    // Assert that database changes are done correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user:{
             name:'Shashank Rastogi',
             email:'shashankrastogi125@gmail.com',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('shashank@123')
})

test('Should login existing user',async ()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existent user',async ()=>{
    await request(app).post('/users/login').send({
        email:'testing@failure.com',
        password:'failure!!'
    }).expect(400)
})

test('Should get profile for user',async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user',async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user',async ()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneId)    
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user',async ()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image',async () =>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/website.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))    
})

test('Should update valid user fields',async()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({name:'Shashank'})
        .expect(200)
    const user = await User.findById(userOneId) 
    expect(user.name).toBe('Shashank')   
})

test('Should not update invalid user fields',async()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({location:'India'})
        .expect(404)  
})
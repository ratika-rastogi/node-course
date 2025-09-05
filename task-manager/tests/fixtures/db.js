import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { User } from '../../src/db/models/users.js'
import { Task } from '../../src/db/models/tasks.js'
export const userOneId = new mongoose.Types.ObjectId()
export const userOne={
    _id:userOneId,
    name:'Test User',
    email:'test@example.com',
    password:'passCode!!',
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

export const userTwoId = new mongoose.Types.ObjectId()
export const userTwo={
    _id:userTwoId,
    name:'Test User 2',
    email:'test2@example.com',
    password:'passCode2!!',
    tokens:[{
        token: jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}

export const TaskOne = {
    _id:new mongoose.Types.ObjectId(),
    description:'Task One',
    completed:false,
    owner:userOne._id
}

const TaskTwo = {
    _id:new mongoose.Types.ObjectId(),
    description:'Task Two',
    completed:true,
    owner:userOne._id
}

const TaskThree = {
    _id:new mongoose.Types.ObjectId(),
    description:'Task Thfree',
    completed:false,
    owner:userTwo._id
}


export const setupDatabase = async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(TaskOne).save()
    await new Task(TaskTwo).save()
    await new Task(TaskThree).save()
}
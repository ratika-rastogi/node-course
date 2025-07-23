import mongoose from 'mongoose'

export function connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
}



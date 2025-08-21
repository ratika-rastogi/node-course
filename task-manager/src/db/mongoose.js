import mongoose from 'mongoose'

export function connect(){
    mongoose.connect(process.env.MONGODB_URL)
}



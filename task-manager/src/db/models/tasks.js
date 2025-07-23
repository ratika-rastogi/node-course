import mongoose from 'mongoose'
import validator from 'validator'

export const Task = mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
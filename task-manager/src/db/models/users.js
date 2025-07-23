import mongoose from 'mongoose'
import validator from 'validator'


export const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        required:true,
        type:String,
        trime:true,
        minlength:7,
        validate(value) {
          if(value.toLowerCase().includes('password')){
                throw new Error('Password should not contain string password')
            }
        }   
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid email')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive number')
            }
        }
    }
})


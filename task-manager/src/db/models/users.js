import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {Task} from './tasks.js'
const userSchema = new mongoose.Schema({
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
        unique:true,
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
    },
    tokens:[{
            token:{
                type:String,
                required:true
            }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (){
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    return userObj
}

//for generating the authentication JWT on instance
userSchema.methods.getAuthenticationToken= async function () {
    const user = this
    const token = jwt.sign({ _id:(user._id).toString() },'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//For finding the user by its credentials
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//for removing the tasks while deleting the user
userSchema.pre('deleteOne',{ document: true, query: false },async function(next){
    const user = this
    console.log(user)
    await Task.deleteMany({ owner:user._id })
    next()
})

//For hashing the password
userSchema.pre( 'save',async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

//indexing on User model
userSchema.index(userSchema.email)


export const User = mongoose.model('User',userSchema)


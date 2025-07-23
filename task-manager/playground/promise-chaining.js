import { connect } from '../src/db/mongoose.js'
import { User } from '../src/db/models/users.js'
connect()


User.findByIdAndUpdate('687f53c567bb1a3ab4bf5760',{
    password:'Shashank123'
}).then((res)=>{
    console.log(res)
    return User.countDocuments({age:0})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
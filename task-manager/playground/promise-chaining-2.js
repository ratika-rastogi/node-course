import { connect } from '../src/db/mongoose.js'
import { Task } from '../src/db/models/tasks.js'
connect()


Task.findOneAndDelete('687f612d72b7f9a0425f48d6').then((res)=>{
    console.log(res)
    return Task.countDocuments({completed:false})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
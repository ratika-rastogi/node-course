import express from 'express'
import { connect } from './db/mongoose.js'
import { userRouter } from './routers/users.js'
import { taskRouter } from './routers/tasks.js'
import { Task } from './db/models/tasks.js'
import { User } from './db/models/users.js'
connect()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, ()=>{
    console.log('Server listening on port -',port)
})


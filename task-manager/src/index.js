import express from 'express'
import { connect } from './db/mongoose.js'
import { userRouter } from './routers/users.js'
import { taskRouter } from './routers/tasks.js'
connect()

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log('Server listening on port -',port)
})


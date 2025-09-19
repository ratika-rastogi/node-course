import express from 'express'
import { connect } from './db/mongoose.js'
import { userRouter } from './routers/users.js'
import { taskRouter } from './routers/tasks.js'

connect()
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


export default app
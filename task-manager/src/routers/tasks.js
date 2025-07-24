import express from 'express'
import { Task } from '../db/models/tasks.js'

export const taskRouter = new express.Router()

taskRouter.post('/tasks' ,async(req,res) => {
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

taskRouter.get('/tasks',(req,res) => {
    Task.find({}).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

taskRouter.get('/tasks/:id',async(req,res) => {
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send('Task Not found!!!')
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

taskRouter.patch('/tasks/:id', async (req,res) => {
    const allowedUpdates =['description','completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({'error':'You are trying to update something which doesnt exist in database'})
    }    
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body , { new:true, runValidators:true })
        if(!task){
            return res.status(400).send('Task that you are trying to update does not exists in the database')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

taskRouter.delete('/tasks/:id', async (req,res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

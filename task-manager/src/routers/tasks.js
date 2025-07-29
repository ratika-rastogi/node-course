import express from 'express'
import { Task } from '../db/models/tasks.js'
import {auth} from '../middleware/auth.js'
export const taskRouter = new express.Router()

taskRouter.post('/tasks',auth ,async(req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

taskRouter.get('/tasks',auth,async (req,res) => {
    try{
        const match = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send('Task Not found!!1')
    }
})

taskRouter.get('/tasks/:id',auth,async(req,res) => {
    const _id = req.params.id
    try{
        console.log(req.user.name)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send('Task Not found!!!')
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

taskRouter.patch('/tasks/:id',auth, async (req,res) => {
    const allowedUpdates =['description','completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({'error':'You are trying to update something which doesnt exist in database'})
    }    
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(400).send('Task that you are trying to update does not exists in the database')
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

taskRouter.delete('/tasks/:id',auth, async (req,res) =>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

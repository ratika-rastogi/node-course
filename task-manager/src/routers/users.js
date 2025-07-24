import express from 'express'
import { User } from '../db/models/users.js'
export const userRouter = new express.Router()

userRouter.post('/users' ,async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

userRouter.get('/users',async (req,res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(error){
        res.status(500).send(error)
    }
})

userRouter.get('/users/:id',async (req,res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send('User Not Found')
        }
        res.send(user)
    }catch(error){
        res.status(500).send(error)
    }
})

userRouter.patch('/users/:id' ,async (req,res) => {
    
    console.log(res.body)
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','password','email','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
         return res.status(404).send({error:'Invalid updates'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true })
        if(!user){
            return res.status(404).send('User not available')
        }
        res.send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

userRouter.delete('/users/:id' ,async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send('User doesnt exists')
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})
import express from 'express'
import { User } from '../db/models/users.js'
import {auth} from '../middleware/auth.js'
export const userRouter = new express.Router()

userRouter.post('/users' ,async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.getAuthenticationToken()
        res.status(201).send({user,token})
    }catch(error){
        res.status(400).send(error)
    }
})

userRouter.post('/users/login',async(req,res)=>{
   try{
    const user = await User.findByCredentials(req.body.email,req.body.password)
    const token = await user.getAuthenticationToken()
    res.send({ user , token})
   }catch(error){
    console.log('Printing error-',error)
    res.status(400).send(error)
   }
})

userRouter.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        console.log(req.token)
        res.send('Logged Out Successfully')
    }catch(e){
        res.status(500).send('Unable to logout- ',e)
    }
})

userRouter.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        console.log(req.user.tokens)
        res.status(200).send('Logged out of all the devices successfully!!!')
    }catch(e){
        res.status(500).send('Unable to logout of all devices',e)
    }
})

userRouter.get('/users/me',auth,async (req,res) => {
    console.log('Inside read profile',req.token)
    res.send(req.user)
})

userRouter.patch('/users/me',auth ,async (req,res) => {
    
    console.log(res.body)
    const updates = Object.keys(req.body)
    const allowedUpdates=['name','password','email','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
         return res.status(404).send({error:'Invalid updates'})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(error){
        res.status(400).send(error)
    }
})

userRouter.delete('/users/me',auth ,async (req,res)=>{
    try{
        await req.user.deleteOne()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})
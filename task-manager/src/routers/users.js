import express from 'express'
import { User } from '../db/models/users.js'
import {auth} from '../middleware/auth.js'
import multer from 'multer'
import sharp from 'sharp'
import {sendWelcomeEmail,sendCancellationEmail } from '../emails/account.js'
export const userRouter = new express.Router()

userRouter.post('/users' ,async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
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

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image file only'))
        }
        cb(undefined,true)
    },
})

userRouter.post('/users/me/avatar',auth,upload.single('avatar'), async (req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send('File uploaded successfully')
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
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
        sendCancellationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.delete('/users/me/avatar',auth ,async (req,res)=>{
    try{
        req.user.avatar= undefined
        await req.user.save()
        res.send({})
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }        
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e)
    }
})
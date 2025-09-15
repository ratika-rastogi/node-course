import express from 'express'
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import {Filter} from 'bad-words'
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = new Server(server)
//Define paths for Express Config
const publicDir=path.join(__dirname,'../public')


app.use(express.json())
app.use(express.static(publicDir))

app.get('/index.html', (req,res) => {
    res.render('index',{
        title:'About Page'
    })
})


io.on('connection',(socket)=>{
    console.log('Websocket Connection')

    socket.emit('message','Welcome to you new chat')
    socket.broadcast.emit('message','New user has joined')

    socket.on('sendMessage',(msg,cb)=>{
        const filter = new Filter()
        if(filter.isProfane(msg)){
            return cb('Profanity is not acceptable!!!')
        }
        io.emit('message',msg)
        cb(' \nMessage delivered successfully at server')
    })

    socket.on('sendLocation',({latitude,longitude},cb)=>{
        io.emit('message',`https://google.com/maps?q=${latitude},${longitude}` )
        cb()
    })

    socket.on('disconnect',()=>{
        io.emit('message','A User has left')
    })
})

server.listen(port,()=>{
    console.log('server listening on port-',port)
})
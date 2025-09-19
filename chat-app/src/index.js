import express from 'express'
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { Filter } from 'bad-words'
import { generateMessage , generateLocationMessage } from './utils/messages.js'
import { addUser , removeUser , getUser , getUsersInRoom } from './utils/users.js'

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

    socket.on('join',({username,room} , callback)=>{
        const {error,user} = addUser({id: socket.id, username,room})
        if(error){
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('message',generateMessage('Admin',`Welcome ${user.username} !`))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined`))    
        io.to(user.room).emit('roomData',{
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()
    })
    
    socket.on('sendMessage',(msg,cb)=>{
        const user = getUser(socket.id)
        const filter = new Filter()
        if(filter.isProfane(msg)){
            return cb('Profanity is not acceptable!!!')
        }
        io.to(user.room).emit('message',generateMessage(user.username,msg))
        cb(' \nMessage delivered successfully at server')
    })

    socket.on('sendLocation',({latitude,longitude},cb)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${latitude},${longitude}`) )
        cb()
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left`))
            io.to(user.room).emit('roomData',{
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port,()=>{
    console.log('server listening on port-',port)
})
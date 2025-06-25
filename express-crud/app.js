import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

let items = [
    {id:1,name:'Item1'},
    {id:2,name:'Item2'}
]


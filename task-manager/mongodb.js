import mongodb, { MongoClient , ObjectId, ReturnDocument} from 'mongodb'


const connectionUrl ='mongodb://127.0.0.1:27017'
const databaseName ='task-manager'
const mongoClient = new MongoClient(connectionUrl)
// const id = new ObjectId()
// console.log(id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)
// console.log(id.toString())
// console.log(id.toString().length)
// console.log(id.getTimestamp())
async function main() {
    await mongoClient.connect()
    console.log('Connected successfully to the server')
    const db = mongoClient.db(databaseName)
    // const result=await db.collection('users').insertOne({
    //     _id:id,
    //     name:"Ratika Rastogi",
    //     age:29
    // })
    // console.log(result.insertedCount)

    // const insertedResults = await db.collection('users').insertMany([
    //     {
    //         "name":"Shashank Rastogi",
    //         "age":33
    //     },
    //     {
    //         "name":"Rudra Rastogi",
    //         "age":0
    //     }
    // ])
    // const results = await db.collection('tasks').insertMany([
    //     {
    //         "description":"Make coffee",
    //         "completed":true
    //     },
    //     {
    //         "description":"Charge your Phone",
    //         "completed":false
    //     },
    //     {
    //         "description":"Water the plants",
    //         "completed":false
    //     }
    // ])

    // const result = await db.collection('users').find({name:'Ratika Rastogi'}).batchSize()
    // console.log(result)

   // const result = await db.collection('tasks').findOne().sort ({ "description": 1 })
   const result = await db.collection('tasks').find({"completed":true}).toArray()
   console.log(result)
    return 'done.'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(()=>mongoClient.close());
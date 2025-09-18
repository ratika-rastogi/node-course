const users= []

//addUser , removeUser , getUser , getUsersInRoom

//addUser
export const addUser = ({id,username,room}) =>{
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room){
        return {
            error: "Username and room are required"
        }
    }

    //check for existing user
    const existingUser = users.find((user)=>{
        return (user.username === username && user.room === room)
    })

    //Validate User
    if(existingUser){
        return {
            error:"Username already in use"
        }
    }

    //Store user
    const user = {
        id , username,room
    }
    users.push(user)
    return {user}
}

//removeUser
export const removeUser = (id)=>{
    const index = users.findIndex((user)=>user.id === id)
    console.log(index)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

//getUser
export const getUser = (id) =>{
    return users.find((user)=> user.id === id)
}


//getUsersInRoom
export const getUsersInRoom = (room) =>{
    room = room.trim().toLowerCase()
    return users.filter((user)=> user.room === room)
}



/**
 * Results.............................................
 */
addUser({
    id:1,
    username:'John Snow',
    room:'Castle Black'
})

const res = addUser({
    id:2,
    username:'John Snow',
    room:'Winterfell'
})

addUser({
    id:3,
    username:'Arya Stark',
    room:'Winterfell'
})

addUser({
    id:4,
    username:'Sansa Stark',
    room:'Winterfell'
})

addUser({
    id:5,
    username:'Bryan Stark',
    room:'Winterfell'
})

addUser({
    id:6,
    username:'Rickon Stark',
    room:'Winterfell'
})

addUser({
    id:7,
    username:'Theon GreyJoy',
    room:'Winterfell'
})

addUser({
    id:8,
    username:'Samwell Tarly',
    room:'Castle Black'
})

addUser({
    id:9,
    username:'Eddard',
    room:'Castle Black'
})

console.log(users)
const removedUser= removeUser(1)
console.log('Removed User')
console.log(removedUser)

console.log('Remaining users')
console.log(users)

console.log('Get particular user')
const returnedUser = getUser(2)
console.log(returnedUser)

const returnedUser2 = getUser(12)
console.log(returnedUser2)

console.log('Users in winterfell')
console.log(getUsersInRoom('winterfell'))
console.log('Users in castle black')
console.log(getUsersInRoom('castle black'))
console.log('Users in Westeros')
console.log(getUsersInRoom('Westeros'))
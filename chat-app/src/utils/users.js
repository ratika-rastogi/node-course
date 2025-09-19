const users= []

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

let users = [];
const addUser = ({id, username, room}) =>{
    //clean data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //validate the data
    if(!username || !room){
        return {
            error: "Username and room are required"
        }
    }
    //check for existing user
    const existinguser = users.find((user)=>{
        return username===user.username && room===user.room;
    })
    //validate username
    if(existinguser){
        return {
            error: "Username is already taken"
        }
    }
    const user = {id, username, room};
    users.push(user);
    return {user};
}

const removeUser = (id) =>{
    const index = users.findIndex((user)=>{
        return user.id ===  id;
    })
    if(index!==-1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) =>{
    return users.find((user)=>{
        return user.id ===  id;
    })
}

const getUsersInRoom = (room) =>{
    const usersinroom = users.filter((user)=>{
        return user.room === room;
    })
    return usersinroom;
}
addUser({
    id: 1,
    username: "Rashid",
    room: "room1",
})
console.log(getUser(1));
module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
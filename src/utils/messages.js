const generateMessage = (username, text) =>{
    return {
        username,
        text,
        createdAt: new Date().getTime(),
    }
}
const generateLocationMessage = (username, url) =>{
    return {
        username,
        url,
        createdAt: new Date().getTime(),
    }
}
//mooment.js is used to manipulate date and time
module.exports = {
    generateMessage,
    generateLocationMessage,
}
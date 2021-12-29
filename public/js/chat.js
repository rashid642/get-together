const socket = io();

const msgarea = document.querySelector("input");
const msgbtn = document.querySelector("#send-msg");
const locbtn = document.querySelector("#send-location");
const msgcontainer = document.querySelector("#messages-container")
const left = document.querySelector("#left")
const singlemsg = document.querySelector(".single-msg")
const msgtemp = document.getElementById("msg-temp").innerHTML;
const loctemp = document.getElementById("loc-temp").innerHTML;
const lefttemp = document.getElementById("left-temp").innerHTML;


const autoscroll = () =>{
    // const newmsg = singlemsg.lastElementChild;
    // const newmsgStyle = getComputedStyle(newmsg);
    // const newmsgMargin = parseInt(newmsgStyle.marginBottom);
    // const newmsgH = newmsg.offsetHeight + newmsgMargin;
    // console.log(newmsgStyle);
    // const visibleHeight = msgcontainer.offsetHeight;
    // // const visibleHeight = msgcontainer.offsetHeight;
    // const scrolloffset = msgcontainer.scrollTop + visibleHeight;
    // msgcontainer.scrollTop = msgcontainer.scrollHeight;
}

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});
socket.emit("join",{username, room},(error)=>{
    if(error){
        alert(error);
        location.href="/"
    }
});

socket.on("message",(msg)=>{
        const html = Mustache.render(msgtemp,{
            username: msg.username,
            message: msg.text,
            createdAt: moment(msg.createdAt).format('h:mm A'),
        });
        msgcontainer.insertAdjacentHTML('beforeend',html);
        autoscroll();
})

socket.on("roomData",({room, users})=>{
    const html = Mustache.render(lefttemp,{
        room,
        users,
    });
    left.innerHTML=html;
})

document.querySelector("form").addEventListener("submit",(e)=>{
    let input = e.target.elements.message;
    msgbtn.setAttribute('disabled', 'disabled');
    e.preventDefault();
    socket.emit("sendMessage", input.value,(msg)=>{
        msgbtn.removeAttribute('disabled');
        msgarea.value = "";
        msgarea.focus();
        console.log(msg);
    });
})

socket.on("location-message",(msg)=>{
    const html = Mustache.render(loctemp,{
        username: msg.username,
        url: msg.url,
        createdAt: moment(msg.createdAt).format('h:mm A'), 
    });
    msgcontainer.insertAdjacentHTML('beforeend',html);
    console.log(msg);
    autoscroll();
})

document.querySelector("#send-location").addEventListener("click",()=>{
    locbtn.setAttribute('disabled', 'disabled');
    if(!navigator.geolocation){
        return alert("Your browser doesn't support geo location");
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        let msg = "latitude="+position.coords.latitude+" Longitude="+position.coords.longitude;
        socket.emit("sendlocation",{lat: position.coords.latitude, lon: position.coords.longitude},(msg)=>{
            locbtn.removeAttribute('disabled');
            console.log(msg);
        });
    })
})
console.log("just wanted to see do u check console")
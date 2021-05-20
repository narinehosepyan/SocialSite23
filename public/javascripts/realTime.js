let url="http://localhost:3000/";

var socket=io(url,{
    autoConnect:false,
})

function newUser(){
    let authToken=localStorage.getItem('authToken')
    socket.auth={
        authToken
    }
    socket.connect()
}

socket.on("user connected",data=>{
    let {username,id}=data;
    addonlineUser(username,id)
})


socket.on("online users",data=>{
    console.log("online users",data);
    data.forEach(user=>{
        let {username,id}=JSON.parse(user);
        addonlineUser(username,id)

    })
});

socket.on('user disconnect',(data)=>{
    let onlinesSection=document.querySelector(`#onlinesSection`);
   onlinesSection.querySelector(`#o${data}`).remove()

});



function addonlineUser(username,id){
    let onlinesSection=document.querySelector('#onlinesSection');
    //checking if is online already user
    if(onlinesSection.querySelector(`#o${id}`) || id==homeUserId){
        return
    }
    onlinesSection.insertAdjacentHTML('afterbegin',`
      <h1 id="o${id}"><img src="/images/circle1.gif" width="12" height="12">${username}</h1>
    `)
}
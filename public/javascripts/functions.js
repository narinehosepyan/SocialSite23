const mainContainer=document.querySelector("#mainContainer");


function displayOnePost(data){
  let postContainer=document.getElementsByClassName('postContainer')[0];
 postContainer.insertAdjacentHTML('afterbegin',`
 <div>
      <p class="display-4">${data.content}</p>
      <p><b>${data.username}</b>  <span>${data.time}</span></p>
  </div>    
 `)
}





function  homeFunction(){

    fetch("/",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem(`authToken`)
        }
    }).then(res=>res.json())
    .then(data=>{
        let {error,userInfo, posts}=data;
       if(error){
           if(error="jwt expired"){
               localStorage.removeItem('authToken');
               location.href="/"
               return
           }
           alert(error);
           return
       }
       let {id,username,image}=userInfo;
       homeUserName=username;
       localStorage.setItem("homeUserName",username);
       homeUserId=id;
       localStorage.setItem("homeUserId",id)
       homeUserImage=image;
       localStorage.setItem("homeUserImage",image)
       displayHomeInfo(id,username,image,posts);
    
       newUser()

    })
}

function displayHomeInfo(id,username,image,posts){
    mainContainer.innerHTML="",
    mainContainer.insertAdjacentHTML('afterbegin',`
    <div class="container-fluid bg-light p-5 text-center">
    <p>
    <button class="btn  btn-primary float-right" id="logOut">LogOut</button>
    </p>
        <h1>${username}</h1>
        <img src="/images/${image}">
        <h3>
            <a href="/profile/${id}" >Profile</a>
        </h3>
        <style>
* {
  box-sizing: border-box;
}
.column {
  float: left;
  width: 33.33%;
  padding: 10px;
  height: 300px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 400px) {
  .column {
    width: 100%;
  }
}
h1 {
    text-shadow: 2px 2px #FF0000;
  }
h2{
    text-shadow: 2px 2px #FF0000;
  }
</style>

<div class="row">
  <div class="column" style="background-color:TOMATO;">
    <h2>NOT FRIENDS</h2>
    
  </div>
  <div class="column" style="background-color:SLATEBLUE">
    <h2>POSTS</h2>
    <p>
        <textarea name="content" id="" class="form-control postContent" rows="5" ></textarea>
        <button class="btn btn-danger addPostBtn">Add New Post</button> 
        <section class="postContainer"></section> 
       </p>
    
  </div>
  <div class="column" style="background-color:MediumSeaGreen;">
    <h2>ONLINE</h2>
    <section id="onlinesSection">
             </section>
    
  </div>
</div>
`)
posts.forEach(post=>{
  let data={
      content:post.content,
      username:post.author.username,
      time:post.createdAt
  }
 console.log(data)
displayOnePost(data)

})


let addPostBtn=document.getElementsByClassName('addPostBtn')[0];
let postContent=document.getElementsByClassName('postContent')[0];


addPostBtn.addEventListener('click',()=>{
  let content=postContent.value;
  let postInfo={
      content:content,
      id: homeUserId,
      username:homeUserName
  }

  socket.emit('new post',postInfo)
  postContent.value=""
})

socket.on('new post',data=>{
  displayOnePost(data)
  
})


//log out
let logOut=document.querySelector("#logOut");
logOut.addEventListener("click", ()=>{
  localStorage.removeItem('authToken');
  location.href="/"
})

};





function loginFunction(){
    mainContainer.innerHTML="",
    mainContainer.insertAdjacentHTML('afterbegin',`
    <div class="container text-center">
  <h1 class="text-danger">Login Form</h1>
  <form  method="post" id="loginForm">
  <p id="loginError"></p>
    <div class="form-group text-danger">
        <label for="email">Email address:</label>
        <input type="email" class="form-control"  placeholder="Enter email" name="email" id="email">
      </div>
    <div class="form-group text-danger">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" placeholder="Enter password" name="password" id="pwd">
    </div>
    <button type="submit" class="btn btn-danger">Submit</button>
  </form>
  <p class="p-5 text-center">
         <button class="btn btn-primary" id="registerBtnLogin"> Register Now</button>
   </p>    
`)

 //go to register
 let  registerBtnLogin=document.querySelector('#registerBtnLogin');
 registerBtnLogin.addEventListener('click',registerFunction);

 //login user

 let loginForm=document.querySelector('#loginForm');
    let loginError=document.querySelector('#loginError')
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        let loginInfo={
            email:loginForm.elements['email'].value,
            password:loginForm.elements['password'].value,
        }

        fetch('/auth/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(loginInfo)
        }).then(res=>res.json())
        .then(data=>{
           console.log(data);
            let {error, user, token}=data;
            if(error){
                loginError.innerHTML=error;
                return;
            }
            // եթե token կա
            if(token){

                //localStorage բրաուզերում մնացող հիշողությունն է
        
                localStorage.setItem('authToken',token);
                username=user.username
                localStorage.setItem('username',user.username);
                location.href="/"

            }

        })
    })  





}

function registerFunction(){
    mainContainer.innerHTML="",
    mainContainer.insertAdjacentHTML('afterbegin',`
    <div class="container text-center">
  <h1 class="text-success">Register Form</h1>
  <form  method="post" id="registerForm">
   <p id="registerError"></p>
    
    <div class="form-group text-success">
      <label for="username">Username:</label>
      <input type="text" class="form-control "  placeholder="Enter username" name="username" id="username">
    </div>
    <div class="form-group text-success">
        <label for="email">Email address:</label>
        <input type="email" class="form-control"  placeholder="Enter email" name="email" id="email">
      </div>
    <div class="form-group text-success">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" placeholder="Enter password" name="password" id="pwd">
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
  <p class="p-5 text-center">
         <button class="btn btn-success" id="cancelRegister"> Cancel</button>
   </p> 
    
`)
    let  cancelRegister=document.querySelector('#cancelRegister');
    cancelRegister.addEventListener('click',()=>{
    location.href="/"  //այսինքն,եթե Cancel  է անում,ուրեմն գնա գլխավոր էջ
});

//register the user
let registerForm=document.querySelector('#registerForm');
let registerError=document.querySelector('#registerError')
registerForm.addEventListener('submit',(e)=>{
    //իրադարձությունը կասեցնում ենք
    e.preventDefault();
    /*դաշտերի ինֆորմացիան պետք է հավաքենք
    և ուղարկենք server`database-ում ունենալու համար*/
    let registerInfo={
        username:registerForm.elements['username'].value,
        email:registerForm.elements['email'].value,
        password:registerForm.elements['password'].value,
    }

    fetch('/auth/register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        //
        body:JSON.stringify(registerInfo)
    }).then(res=>res.json())
    .then(data=>{
       console.log(data);
        let {error, info}=data;
        if(error){
            registerError.innerHTML=error;
            return;
        }

       if(info){
           loginFunction()
       }

    })
})


}



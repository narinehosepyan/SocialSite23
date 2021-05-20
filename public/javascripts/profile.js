let profileInfo=document.querySelector("#profileInfo");
let profileImg=document.querySelector("#profileImg");

let homeUserId=localStorage.getItem('homeUserId');
let visitedId=location.pathname.slice('/profile/'.length);

if(localStorage.getItem("authToken") && homeUserId==visitedId){
    profileInfo.insertAdjacentHTML('beforeend',`
    
    <p >
    
    <button id="editImageBtn">Change Photo</button>  
    </p>
    <section id="editImagePart" hidden >
    <p id="imageChangeError"></p>
    <input type="file" name="file" id="attachFile"> 
    <p>
    <input type="button" value="Save" id="changeBtn"> 
    <input type="button" value="Cancel" id="cancelChangeBtn">
    </p> 
    </section>  
`)
/*we are select them by ID */

let editImageBtn=document.querySelector("#editImageBtn");
let attachFile=document.querySelector("#attachFile");
let editImagePart=document.querySelector("#editImagePart");
let changeBtn=document.querySelector("#changeBtn");
let cancelChangeBtn=document.querySelector("#cancelChangeBtn");
let imageChangeError=document.querySelector("#imageChangeError");

/*want to change photo*/

editImageBtn.addEventListener('click',()=>{
    editImageBtn.hidden=true;
    editImagePart.hidden=false;

})

/* reject to change photo*/

cancelChangeBtn.addEventListener('click',()=>{
    editImageBtn.hidden=false;
    editImagePart.hidden=true;

})

/*attached photo*/

attachFile.addEventListener('change',()=>{
    let href=URL.createObjectURL(attachFile.files[0]);
    profileImg.src=href;

})

/*we save photo and deliver to the server by fetch*/

changeBtn.addEventListener('click',()=>{
    let formData=new FormData();
    formData.append('profileImg',attachFile.files[0]);

    fetch("/changePhoto",{
        method:"POST",
        headers:{
            "Authorization":"Bearer "+localStorage.getItem('authToken')
        },
        body:formData
    }).then(res=>res.json())
    .then(data=>{
      let {error,imageName}=data;
      if(error){
          alert(error)
        imageChangeError.innerHTML=error;
      }
      alert(imageName)
      profileImg.src="/images/"+imageName;
      editImageBtn.hidden=false;
      editImagePart.hidden=true;
      attachFile.value=""

    })
})



}
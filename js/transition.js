function goToLogin(){

    document.body.classList.add("slide-up");

    setTimeout(()=>{
        window.location.href="login.html";
    },1000); // matches animation time
}
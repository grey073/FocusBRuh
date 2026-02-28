document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", function () {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(email !== "" && password !== ""){
            window.location.href = "inde.html";
        } else {
            alert("Enter Email and Password");
        }

    });

});
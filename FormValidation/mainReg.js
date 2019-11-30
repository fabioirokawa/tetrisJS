function validate() {

    var username = document.getElementById("uname");
    var password = document.getElementById("pass");
    var password2 = document.getElementById("pass2");

    if (username.value.trim() == ""){
        alert("Blank Username")
        return false;
    } else if(password.value.trim() == "" || password2.value.trim() == ""){
        alert("Blank Password")
        return false;
    } else if(password2.value.trim() != password.value.trim()){
        alert("Passwords don't match");
        return false;   
    }
    else{
        true;
    }


}
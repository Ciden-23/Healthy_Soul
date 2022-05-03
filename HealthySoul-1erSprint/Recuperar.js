firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd",
});


var recoverPass = function(){
    let email = document.querySelector(".inputC").value;
    let camb = document.getElementById("prr");

    camb.style.display="none";
    email = email.trim();
    if (email === '') { 
        let mensa = msg("1") ;
        camb.textContent= mensa;
        camb.style.display="block";
            
    }else{
        let pos;
        let tipou;
        pos = email.search(/@healthysoul.com/i);
        if (pos >= 0) {
            tipou = "admin"
            let mensa = msg("2") ;
        camb.textContent= mensa;
        camb.style.display="block";
    
        }else{
            firebase.auth().sendPasswordResetEmail(email).then(()=> {
                // Signed in
          
                window.location.href="Enviado.html";
                // ...
            })
            .catch(function(error) {
                // alert('Se ha enviado un correo a su cuenta.Por favor sigue los pasos indicados.');
             //    let val =document.querySelector(".envi");
               //  val.href="Enviado.html";
            
        
                let errorCode = error.code;
                console.log(errorCode);
                let errorMessage = msg(errorCode);
                console.log(errorMessage);
                camb.textContent= errorMessage;
                camb.style.display="block";
   
             });
             
         }

        } 
            
    } 
    

    

function redi(){
    window.location.href="index.html";


}

function msg(errorCode) {
    let msg;
    switch (errorCode) {
        case "1":
            msg = "El campo no puede estar vacio.";
            break;
        case "2":
           msg ="No se puede restablecer un correo de administrador.";
        break;
        case "auth/invalid-email":
            msg = "Error por favor ingrese un correo existente";
            break;
        case "auth/internal-error":
            msg = "Error: Hay un problema con el servidor, por favor intente más tarde";
            break;
        case "auth/too-many-requests":
            msg = "Error: Se han realizado demasiados intentos, por favor intente más tarde"
            break;
        default:
            msg = "Error por favor ingrese un correo existente";
            break;
    }
    return msg;
}

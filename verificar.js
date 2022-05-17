// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd",
});
var val=obtenerValor('tipo');
  
  console.log(val);
  
  var val2=obtenerValor('id');

  console.log(val2);
  
  var val3=obtenerValor('bandera');

  console.log(val3);
  mov();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
        console.log(user);
        let pos;
        let tipou;
        pos = email.search(/@healthysoul.com/i);
        if (pos >= 0) {
            tipou = "admin"
            window.location.href = "Usuario Admin/ListaRecetas.html";
        } else {
            tipou = "amayor"
            window.location.href = "Usuario abuelo/ListaRecetas.html";
        }
    } else {
        console.log("No logeado")
    }
});
let err;
err = 0

function acceso() {
    console.log(err);
    if (err == 5) {
        console.log("Alcanzado");
        console.log(err);
        alert(msg("auth/too-many-requests"))
        setTimeout(rec, 15000);
    } else {
        let email = document.getElementById("1").value;
        let pass = document.getElementById("2").value;
        email = email.trim();
        if (email === '') {
            if (pass === '') {
                alert(msg("1"));
            } else {
                alert(msg("2"));
            }
        } else {
            let t;
            t = verf(email);
            if (t == "-1") {
                alert(msg("3"));
            } else {
                if (pass === '') {
                    alert(msg("4"));
                } else {
                    firebase.auth().signInWithEmailAndPassword(email, pass)
                        .then((userCredential) => {
                            // Signed in
                            let user = userCredential.user;
                            // ...
                        })
                        .catch(function(error) {
                            let errorCode = error.code;
                            console.log(errorCode);
                            let errorMessage = msg(errorCode);
                            console.log(errorMessage);
                            alert(errorMessage);
                            if (errorCode == "auth/wrong-password") {
                                document.getElementById("2").value = "";;
                            }
                        });
                }

            }
        }
    }
}


function verf(email) {
    let t;
    t = email.search(/(@healthysoul.com|@gmail.com|@outlook.com|@yahoo.com|@hotmail.com)/i);
    if (t == "0") {
        t = "-1";
    }
    console.log(t);
    return t;
}

function rec() {
    location.reload;
    console.log("Reiniciando");
    err = 0;
    console.log(err);
}


function msg(errorCode) {
    let msg;
    switch (errorCode) {
        case "1":
            msg = "El campo de correo y contraseña son obligatorios";
            break;
        case "2":
            msg = "El campo de correo no puede estar vacío";
            break;
        case "3":
            msg = "Error: El correo electrónico es inválido";
            err++;
            break;
        case "4":
            msg = 'La contraseña es obligatoria';
            break;
        case "auth/invalid-email":
            msg = "Error: Correo no registrado";
            err++;
            break;
        case "auth/wrong-password":
            msg = "Error: Contraseña incorrecta."
            break;
        case "auth/internal-error":
            msg = "Error: Hay un problema con el servidor, por favor intente más tarde";
            break;
        case "auth/too-many-requests":
            msg = "Error: Se han realizado demasiados intentos, por favor intente más tarde"
            break;
        default:
            msg = "Error: El correo o la contraseña son incorrectos, por favor verifica los datos";
            break;
    }
    return msg;
}
/* codigo kiri eres muy bueno*/

function obtenerValor(sParametroNombre){
    var sPaginaURL=window.location.search.substring(1);
    var sURLVariables= sPaginaURL.split('&');
    for(var i = 0;i<sURLVariables.length ;i++){
        var sParametro=sURLVariables[i].split('=');

        if(sParametro[0]==sParametroNombre){
          return sParametro[1];
        }
    }
    return null;
  }

  function mov(){
      console.log("Aqui");
    if(val3==1){
    
     let xxx =document.querySelector(".x");
     xxx.href="detalleRecetas.html?bandera=%271%27&tipo=%27"+val+"%27&id=%27"+val2+"%27";
    }
    
   }
    /* codigo kiri eres muy bueno*/

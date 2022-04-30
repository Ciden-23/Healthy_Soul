// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd",
});

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

function acceso() {
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
        if (pass === '') {
            alert(msg("3"));
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
                });
        }
    }
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
            msg = 'La contraseña es obligatoria';
            break;
        case "auth/invalid-email":
            msg = "Error: Correo invalido o no registrado";
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
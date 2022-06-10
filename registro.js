// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd",
});

var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;
       
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
        
    }
});

function registro() {
    let nombre = document.getElementById("1").value;
    nombre = nombre.trim();
    let apellido = document.getElementById("3").value;
    apellido = apellido.trim();
    let email = document.getElementById("4").value;;
    email = email.trim();
    let contraseña = document.getElementById("2").value;
    let aux;
    aux = compvac(nombre, apellido, email, contraseña);
    
    switch (aux) {
        case 1:
            alert(msg("1"));
            break;
        case 2:
            alert(msg("2"));
            break;
        case 3:
            alert(msg("3"));
            break;
        case 4:
            alert(msg("4"));
            break;
        case 5:
            alert(msg("5"));
            break;
        case 0:
            let cod;
            cod = compr(nombre, apellido);
            
            switch (cod) {
                case 1:
                    alert(msg("6"));
                    break;
                case 2:
                    alert(msg("7"));
                    break;
                case -1:
                    let everf = verf(email);
                    
                    if (everf != -2) {
                        if (everf == -1) {
                            alert(msg("auth/invalid-email"));
                            document.getElementById("1").value = "";
                            document.getElementById("2").value = "";
                            document.getElementById("3").value = "";
                            document.getElementById("4").value = "";
                        } else {
                            alert(msg("8"));
                            document.getElementById("1").value = "";
                            document.getElementById("2").value = "";
                            document.getElementById("3").value = "";
                            document.getElementById("4").value = "";
                        }
                    } else {
                        let cont;
                        cont = countDat(nombre, apellido);
                       
                        nombre = nombre.concat(" ");
                        let nomcomp = nombre.concat(apellido);
                       
                        if (cont == 0) {
                            cont = countEm(email, contraseña);
                        }
                       
                        switch (cont) {
                            case 9:
                                alert(msg("9"));
                                break;
                            case 10:
                                alert(msg("10"));
                                break;
                            case 11:
                                alert(msg("11"));
                                break;
                            case 12:
                                alert(msg("12"));
                                break;
                            case 13:
                                alert(msg("13"));
                                break;
                            case 14:
                                alert(msg("14"));
                                break;
                            case 0:
                                firebase.auth().createUserWithEmailAndPassword(email, contraseña)
                                    .then((userCredential) => {
                                        // Signed in
                                        const user = firebase.auth().currentUser;
                                       
                                        let uid = user.uid;
                                        
                                        user.updateProfile({
                                            displayName: nomcomp,
                                            photoURL: null
                                        }).then(() => {
                                            // Update successful
                                            // ...
                                            const initialData = {
                                                Nombre: nomcomp
                                            };
                                            db.collection('dattaUser').doc('user').collection(uid).doc('datos iniciales').set(initialData);
                                        }).catch((error) => {
                                            // An error occurred
                                            // ...
                                        });
                                    })
                                    .catch((error) => {
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                       
                                        alert(msg(errorCode));
                                        document.getElementById("1").value = "";
                                        document.getElementById("2").value = "";
                                        document.getElementById("3").value = "";
                                        document.getElementById("4").value = "";
                                        // ..
                                    });
                                break;
                        }
                    }
                    break;
            }
            break;
    }
}

function compvac(nombre, apellido, email, contraseña) {
    let est = 0;
    if (nombre == '' && apellido == '' && email == '' && contraseña == '') {
        est = 1;
    } else if (nombre == '') {
        est = 2;
    } else if (apellido == '') {
        est = 3;
    } else if (email == '') {
        est = 4;
    } else if (contraseña == '') {
        est = 5;
    } else {
        est = 0;
    }
    return est;
}

function compr(nom, apel) {
    let t;
    let pat = /^[A-Za-z\s\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1]+$/;
    t = nom.match(pat)
    
    if (t == null) {
        t = 1;
    } else {
        t = apel.match(pat)
        if (t == null) {
            t = 2;
        } else {
            t = -1;
        }
    }
    return t;
}

function verf(email) {
    let t = -2;
    t = email.search(/@healthysoul.com/i);
  
    if (t == -1) {
        t = -2;
       
        t = email.search(/(@gmail.com|@outlook.com|@yahoo.com|@hotmail.com)/i);
        
        if (t <= 0) {
            t = "-1";
        } else {
            t = -2
        }
    }
   
    return t;
}

function countDat(nombre, apellido) {
    let cont;
    let ver = true;
    
    if (nombre.length < 3 && ver) {
        cont = 9;
    } else if (nombre.length > 20 && ver) {
        cont = 10;
    } else if (apellido.length < 4 && ver) {
        cont = 11;
    } else if (apellido.length > 30 && ver) {
        cont = 12;
    } else {
        cont = 0;
    }
    return cont;
}

function countEm(email, cont) {
    let con;
    if (email.length > 30) {
        con = 13;
    } else if (cont.length > 15) {
        con = 14;
    } else {
        con = 0;
    }
    return con;
}

function msg(errorCode) {
    let msg;
    switch (errorCode) {
        case "1":
            msg = "Todos los campos son obligatorios";
            break;
        case "2":
            msg = "El campo de nombre no puede estar vacío";
            break;
        case "3":
            msg = "El campo de apellido no puede estar vacío";
            break;
        case "4":
            msg = "El campo de correo no puede estar vacío";
            break;
        case "5":
            msg = "El campo de contraseña no puede estar vacío";
            break;
        case "6":
            msg = "El campo de nombre no puede contener símbolos especiales";
            break;
        case "7":
            msg = "El campo de apellido no puede contener símbolos especiales";
            break;
        case "8":
            msg = "Error: Dominio de correo reservado";
            break;
        case "9":
            msg = "La longitud mínima es de 3 caracteres para el campo Nombre"
            break;
        case "10":
            msg = "La longitud permitida es de 20 caracteres para el campo Nombre"
            break;
        case "11":
            msg = "La longitud mínima es de 4 caracteres para el campo Apellido"
            break;
        case "12":
            msg = "La longitud permitida es de 30 caracteres para el campo Apellido"
            break;
        case "13":
            msg = "La longitud permitida es de 30 caracteres para el campo Correo"
            break;
        case "14":
            msg = "La longitud permitida es de 15 caracteres para el campo Contraseña"
            break;
        case "auth/invalid-email":
            msg = "Error: Correo electrónico inválido";

            break;
        case "auth/weak-password":
            msg = "Error: La contraseña deberá contener como mínimo 6 caracteres";

            break;
        case "auth/email-already-in-use":
            msg = "Error: Correo electrónico ya en uso";

            break;
        case "auth/internal-error":
            msg = "Error: Hay un problema con el servidor, por favor intente más tarde";
            break;
        default:
            msg = "Error: Algunos de los datos son inválidos, por favor verifica los datos";
            document.getElementById("1").value = "";
            document.getElementById("2").value = "";
            document.getElementById("3").value = "";
            document.getElementById("4").value = "";
            break;
    }
    return msg;
}

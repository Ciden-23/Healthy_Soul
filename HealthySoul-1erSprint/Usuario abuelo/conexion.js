// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd",
});
let cam = 0;
//variable que se puede declarar en cada archivo que necesite la bd
var db = firebase.firestore();
let bandera = true;
disableS();
//Arreglo con el nombre de las categorias
let categorias = [
    "Almuerzos",
    "Cenas",
    "Desayunos",
    "Ensaladas",
    "Jugos",
    "Meriendas",
];
//Usar un for para recorrer los elementos de la lista
for (let i = 0; i < categorias.length; i++) {
    //Guardar en una variable el nombre de la categoria
    const categ = categorias[i];

    const categRef = db.collection(categ);

    categRef.get().then((results) => {
        const data = results.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        for (var i = 0; i < data.length; i++) {
            var nom = data[i].Nombre
                //OBTIENE EL ID DE CADA RECETA DE UNA COLEECION (Aqui deberia verificarse que receta fue elegida por el nombre, y obtener su ID 
                //para generar un HTML de la receta)
            var ide = data[i].id
            var img = data[i].Imagen
            console.log("nombre de la receta", nom);
            console.log("id de la receta", ide);
            console.log("imga", img);
            console.log("categoria", categ);
            imagen.innerHTML += `<a href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'"><div class="tarjeta">
                      <img src="${img}">
                      <h3>${nom} </h3>
                  </div></a>`;
        }
    })
}

function aa() {
    const no = document.querySelector(".iconProfile");
    no.style.display = "none";
    const fo = document.querySelector(".fo");
    fo.style.display = "block";
    enableS();
    document.body.style.overflow = "scroll";
    document.body.style.overflowX="hidden";
}

function disableS() {
    // To get the scroll position of current webpage
    TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    

        // if scroll happens, set it to the previous value
        window.onscroll = function() {
            window.scrollTo(LeftScroll, TopScroll);
        };
}

function enableS() {
    window.onscroll = function() {};
}

setTimeout(aa, 3000);
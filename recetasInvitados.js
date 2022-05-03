// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDPKylT8Mizp2qRkeHVdzdmDAdRC4vyagQ",
    authDomain: "healthy-soul-db.firebaseapp.com",
    projectId: "healthy-soul-db",
    storageBucket: "healthy-soul-db.appspot.com",
    messagingSenderId: "368826998840",
    appId: "1:368826998840:web:d97a765e96b27dfeb106cd",
});

//variable que se puede declarar en cada archivo que necesite la bd
var db = firebase.firestore();

//Arreglo con el nombre de las categorias
let categorias = [
    "Desayunos",
    "Almuerzos",
    "Cenas",

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

        var nom = data[0].Nombre
                //OBTIENE EL ID DE CADA RECETA DE UNA COLEECION (Aqui deberia verificarse que receta fue elegida por el nombre, y obtener su ID 
                //para generar un HTML de la receta)
            var ide = data[0].id
            var img = data[0].Imagen
            console.log("nombre de la receta", nom);
            console.log("id de la receta", ide);
            console.log("imga", img);
            console.log("categoria", categ);
            imagen.innerHTML += `<a href="detalleRecetas.html?tipo='${categ}'&id='${ide}'"><div class="tarjeta">
                      <img src="${img}">
                      <h3>${nom} </h3>
                  </div></a>`;
        
    })
}



//variable que se puede declarar en cada archivo que necesite la bd
var db = firebase.firestore();
//Variables que capturan el id y nombre para borrar receta
var ideBorrar;
var categBorrar;
var nom;

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

window.onload = inicializar;
function inicializar(){
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
            //console.log(data, "datos")
            for (var i = 0; i < data.length; i++) {
                var nom = data[i].Nombre
                    //OBTIENE EL ID DE CADA RECETA DE UNA COLEECION (Aqui deberia verificarse que receta fue elegida por el nombre, y obtener su ID 
                    //para generar un HTML de la receta)
                var ide = data[i].id
                var img = data[i].Imagen
                imagen.innerHTML += `<div class="tarjeta" id="tarjeta"><a href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'">
                        <img src="${img}">
                        <div class="tamaño"><h3>${nom}</h3></div>
                    </a>
                    <div>
                    <input type = "button" class="botonBorrar" id="abrir" nombre="${ide}" onclick="borrar('${ide}','${categ}','${nom}');" value="Borrar" style="float: right;"/>
                    </div>
                    </div>`;
            }
        })
    }
}

function alerta(){
    alert("Funciona");
}

function borrar(ide, categor,nomm) {
    ideBorrar=ide;
    categBorrar=categor; 
    nom=nomm;
    //console.log(ideBorrar,categBorrar,nom)
    const modalContainer = document.getElementById("modal-container");
        modalContainer.classList.add('show');
   }
function cancelar(){
    const modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove('show');
    ideBorrar="";
    categBorrar="";
    nom="";
    //console.log(ideBorrar,categBorrar,nom, "eliminadas")
}

function borrarReceta(){
    const modalContainer = document.getElementById("modal-container");
   // alert("Borrar")
   db.collection(categBorrar).doc(ideBorrar).delete().then(() => {
    console.log("Documento borrado exitosamente!");
    modalContainer.classList.remove('show');
    ideBorrar="";
    categBorrar="";
    nom="";
    //console.log(ideBorrar,categBorrar,nom, "eliminadas")
    location.reload();
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}

function clasificarCat7(categoria){
    var container = document.getElementById('imagen');
    let tarj = Array.prototype.slice.call(document.getElementsByClassName("tarjeta"), 0);
    for(element of tarj){
        element.remove();
    }  
    mostrarCat(categoria);
}

function clasificarCat(categ){
    var container = document.getElementById('imagen');
    let tarj = Array.prototype.slice.call(document.getElementsByClassName("tarjeta"), 0);
    for(element of tarj){
        element.remove();
    }
    const categRef = db.collection(categ);
    categRef.get().then((results) => {
        const data = results.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        for (var i = 0; i < data.length; i++) {
            var nom = data[i].Nombre
            var ide = data[i].id
            var img = data[i].Imagen
            imagen.innerHTML += `<div class="tarjeta"><a href="ModeloRecetaGeneral3.html?tipo='${categ}'&id='${ide}'">
                      <img src="${img}">
                      <div class="tamaño"><h3>${nom}</h3></div>
                  </a>
                  <div>
                  <input type = "button" class="botonBorrar" id="abrir" nombre="${ide}" onclick="borrar('${ide}','${categ}','${nom}');" value="Borrar" style="float: right;"/>
                  </div>
                  </div>`;
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
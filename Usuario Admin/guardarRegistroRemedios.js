//Conexion con la base de datos
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
//Variable que controla titulos repetidos
var controlar = true;
var titulos = [];
//Variables que controlan el id dinamico de la etiqueta
var contadorIngredientes = 2;
var contadorPasos = 52;
var contadorValor = 102;

//Variables para unir los campos como un solo texto

var ingredienteAñadido = ""
var pasoAñadido = ""
var descripcion = ""

//Variable que controla si la imagen se cargo correctamente
var imgCargada = false;

//Variable que guarda la categoria escogida
var nombreColeccion;
window.onload = cargarSelect;
var maxCat=0;
function cargarSelect(){
    var a= document.getElementById("tipos");
    db.collection("Dolores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let option= `<option class="opcion" value="${doc.data().Dolor}">${doc.data().Dolor}</option>`
            a.insertAdjacentHTML("beforeend", option);
            maxCat=maxCat+1;
        });
    });
}

//---------METODOS----------
//Añadir un nuevo input para agregar otro ingrediente
function aniadirIngredientes() {

    if (contadorIngredientes <= 10) {
        const aniadir = document.getElementById("añadir")
        aniadir.insertAdjacentHTML("beforeend", '<input class="ingresoTexto" id="0" placeholder="Ingrese ingrediente" />');
        cambiarIDIngrediente()
        contadorIngredientes += 1;
    } else {
        //No deja que se agregue mas de 10 ingredientes.
        alert("No es posible añadir mas ingredientes.")
    }
}

//Cambia el id de una etiqueta de ingredientes
function cambiarIDIngrediente() {
    document.getElementById('0').id = contadorIngredientes;
}

//Funcion que agarra todos los ingredientes y los une en una sola variable para guardarlo en la BD.
function juntarIngredientes() {
    var contRegIngre = 1;
    while (contRegIngre != contadorIngredientes) {
        var ingrediente = document.getElementById(contRegIngre).value;
        ingredienteAñadido = ingredienteAñadido + "-" + ingrediente + " ";
        contRegIngre += 1
    }
}

function eliminarIngrediente(){
   if(contadorIngredientes > 2){
       casilla = document.getElementById(contadorIngredientes-1);	
       casilla.parentNode.removeChild(casilla);
       
       contadorIngredientes--;
       }else{
           alert("No se pueden eliminar más casillas")
       }
}

//Añade un nuevo input para agregar otro paso
function aniadirPasos() {
    if (contadorPasos <= 60) {
        const preparacion = document.getElementById("preparacion")
        preparacion.insertAdjacentHTML("beforeend", '<input class="ingresoTexto" id="50" placeholder="Ingrese paso" />');
        cambiarIDPreparacion()
        contadorPasos += 1;
    } else {
        //No deja que se agregue mas de 10 pasos.
        alert("No es posible añadir mas pasos.")
    }
}

//Cambia el id de una etiqueta de pasos
function cambiarIDPreparacion() {
    document.getElementById('50').id = contadorPasos;
}

//Funcion que agarra todos los pasos y los une en una sola variable para guardarlo en la BD.
function juntarPasos() {
    var contRegPasos = 51;
    while (contRegPasos != contadorPasos) {
        var pasosSeguir = document.getElementById(contRegPasos).value;
        pasoAñadido = pasoAñadido + "-" + pasosSeguir + " "
        contRegPasos += 1
    }
}

function eliminarPaso(){
   if(contadorPasos > 52){
       casilla = document.getElementById(contadorPasos-1);	
       casilla.parentNode.removeChild(casilla);
       
       contadorPasos--;
   }else{
       alert("No se pueden eliminar más casillas")
   }
}

//Preview y validacion de la imagen antes de guardarla en la BD
var imgActual;
var imagenPintada;
function revisarArchivo(img) {
    if (img.files[0]) {
        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!allowedExtensions.exec(filePath)) {
            alert('Por favor solo subir imagenes con extension .jpeg .jpg .png');
            fileInput.value = '';
            return false;
        }else{
            var refActualimg = file.files[0];
            revisarImagen(img, refActualimg);
            document.getElementById("file").value = null;
           //console.log("IMAGEN ACTUAL",imagenPintada)
        }
    }
}

function revisarImagen(img, refImg) {
    var fileUpload = img;
    var reader = new FileReader();
    reader.readAsDataURL(fileUpload.files[0]);
    reader.onload = function(e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
            var height = this.height;
            var width = this.width;
            //primero verifica que las dimensiones sean las mismas
            if (width.toFixed(0) == height.toFixed(0)) {
                if (width.toFixed(0) < 600 && height.toFixed(0) < 600) {
                    alert('Tamaño de imagen no permitido.');
                } else {
                    imgActual = reader.result;
                    pintarImagen(refImg)
                    document.getElementById("file").value;
                }
            } else {
                alert('Dimensiones de imagen distintas.');
            }
        };
    }
}

function pintarImagen(imagen) {
    document.getElementById("file").files[0];
    document.getElementById("img");
    document.getElementById("img").src = imgActual;
    document.getElementById("img").width = 350;
    document.getElementById("img").height = 350;
    imgCargada = true;
    imagenPintada = imagen;
    //console.log("imagen Actual pintada",imagenPintada);
}

//---------VALIDACIONES------------

//----------VALIDACION REMEDIOS REPETIDAS----------

function testTitulo() {
    
    //document.getElementById("botonReg").disabled = true;
    var titulo = document.getElementById("titulo").value;
    //Reemplazamos los saltos de linea por espacios
    titulo = titulo.replace (/\r?\n/g," ");
    //Reemplazamos los espacios seguidos por uno solo
    titulo = titulo.replace (/[ ]+/g," ");
    //Quitarmos los espacios del principio y del final
    titulo = titulo.replace (/^ /,"");
    titulo = titulo.replace (/ $/,"");
    //comas
    titulo = titulo.replace (/,,+/g,",");
    console.log(titulos.length)
    for (j = 0; j < titulos.length; j++) {
         if (titulo.toLowerCase() == titulos[j].toLowerCase()) {
             console.log(titulo, titulos[j])
             controlar = false;
             j = titulos.length + 1
            //alert("El remedio ya esta registrado en la base de datos.")
             //location.reload()
             //document.getElementById("botonReg").disabled = "false"
         }
 
     }
}

function repetido(id){
    /*var remedio = document.getElementById("titulo").value;
    console.log(remedio);
    let cateRemedio = tipo.value;
    console.log(cateRemedio, "aqui");
    var id = buscarId(cateRemedio);*/
    console.log(id);
    db.collection("Dolores").doc(id).collection("Remedios").get().then((snapshot) => {
        console.log("se encontro")
            snapshot.forEach(doc => {
                console.log("entro");
                titulos.push(doc.data().Nombre)
                console.log(titulos)
                testTitulo();
                console.log(controlar,"antes");
                
            });
            if (controlar == true) {
                console.log("si llamo");
                setTimeout(registrar,500);
            }else{
                alert("El remedio ya esta registrado en la base de datos.")
                location.reload()
            }
    });
}

function buscarId(){
    var ide = "";
    var remedio = document.getElementById("titulo").value;
    console.log(remedio);
    let cateRemedio = tipo.value;
    console.log(cateRemedio, "aqui");
   // document.getElementById("botonReg").disabled = true;
    if(cateRemedio != "1" && cateRemedio != "0"){
        db.collection("Dolores").where("Dolor", "==", cateRemedio).get().then((results) => {
            //console.log("se encontro");
            const data = results.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            ide = data[0].id
            //ideRem = ide;
            repetido(ide);
            //console.log(ideRem, "saa"); 
        })
    }else{
        setTimeout(registrar, 500);
    }
}


//-----------------VALIDA CAMPO TITULO VACIO Y CARACTERES ALFABETICOS-----------------

function validacion_titulo(titulo){
   var valido = true;
   var pattern = /^[A-Za-z\s\u002c\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00dc\u00fc]+$/;//,
   
   if(titulo.match(pattern)){
       return valido
   }
   else{
       if(titulo == ""){
           alert("No se aceptan campos vacíos en el nombre.")
           i=contadorIngredientes+1
           valido = false;
       }else{
           alert("Solo se aceptan caracteres alfabeticos y comas en el nombre.")
           ingredienteAñadido = ""
           pasoAñadido = ""
           descripcion = ""
           return valido = false;
       }
   }
}

//---------------VALIDA CANTIDAD DE PALABRAS TITULO---------
function contar_palabras_titulo(titulo){
   var controlar = true;
      // titulo = titulo.replace (/""+/g,"");
       

       //Reemplazamos los saltos de linea por espacios
       titulo = titulo.replace (/\r?\n/g," ");
       //Reemplazamos los espacios seguidos por uno solo
       titulo = titulo.replace (/[ ]+/g," ");
       //Quitarmos los espacios del principio y del final
       titulo = titulo.replace (/^ /,"");
       titulo = titulo.replace (/ $/,"");
       //comas
       titulo = titulo.replace (/,,+/g,",");
       console.log(titulo, "salida");
       //Troceamos el texto por los espacios
       var textoTroceado = titulo.split (" ");
       //console.log(textoTroceado);
       
       //Contamos todos los trozos de cadenas que existen
       tituloAniadido = titulo
       var numeroPalabras = textoTroceado.length; 
               if(numeroPalabras>8){
                   alert("La cantidad máxima de palabras aceptadas para el nombre es de 8.");
                   controlar=false;
               }else{
                   
                           if(textoTroceado[0] == ""){
                               alert("No se permiten solo espacios como nombre");
                               controlar=false;
                           }
                       }
                       for(i = 0; i < textoTroceado.length; i++){
                           //console.log(i);
                           //console.log(textoTroceado);
   
                           if(textoTroceado[i].length > 12){
                              // console.log(textoTroceado[i]);
                               // console.log(textoTroceado[i].length);
                               alert("La cantidad máxima de caracteres por palabra en el nombre es de 12.");
                               controlar=false;
                               i = textoTroceado.length
                           }
                        } 
               return controlar;
}



//-----------VALIDAR CAMPOS VACIOS Y CARACTERES ALFANUMERICOS Y ESPECIALES DE INGREDIENTES---------------
function validacion_ingredientes(){
   var valido = true;
   for(i=1; i < contadorIngredientes; i++){
   var ingredienteValido = document.getElementById(i).value
   var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00a1\u0021\u0027\u003a\u003b\u00dc\u00fc]+$/;// ()",./""%¡!':;
   
       if(ingredienteValido.match(pattern)){
           valido = true
       }
       else{
           if(ingredienteValido == ""){
               alert("No se aceptan campos vacíos en ingredientes.")
               i=contadorIngredientes+1
               return valido = false;
           }else{
               //Tambien acepta ""
               alert("Solo se aceptan caracteres alfanuméricos en los ingredientes y los siguientes caracteres especiales: ( ) ,  . / % ¡ !  ' : ; \u0022")
               i=contadorIngredientes+1
               valido = false;
            
           }
       }
           //-----CONTROLA CANTIDAD DE PALABRAS EN INGREDIENTES------------
           //Reemplazamos los saltos de linea por espacios
           var texto = ingredienteValido.replace (/\r?\n/g," ");
           //Reemplazamos los espacios seguidos por uno solo
           texto = texto.replace(/\s\s+/g," ");
           
           //Quitarmos los espacios del principio y del final
           texto = texto.replace (/^ /,"");
           texto = texto.replace (/ $/,"");
           //Troceamos el texto por los espacios
           var textoTroceado = texto.split (" ");
           //Contamos todos los trozos de cadenas que existen
           var numeroPalabras = textoTroceado.length;

           //Mostramos el número de palabras
           if(numeroPalabras>15){
               alert("la cantidad máxima de palabras aceptadas para ingredientes es de 15");
               valido=false;
               i=contadorIngredientes+1
           }else{
               if(numeroPalabras<1){
                   alert("la cantidad mínima de palabras aceptadas para ingredientes es de 1");
                   valido=false;
                   i=contadorIngredientes+1
               }else{
                   if(textoTroceado[0] == ""){
                       alert("No se permiten solo espacios como ingrediente");
                       valido=false;
                       i=contadorIngredientes+1
                   }
               }
       }
   }
   return valido
}

//-----------VALIDAR CAMPOS VACIOS Y CARACTERES ALFANUMERICOS Y ESPECIALES DE PASOS---------------
function validacion_pasos(){
   var valido = true;
   for(i=51; i < contadorPasos; i++){
   var pasoValido = document.getElementById(i).value
   var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00a1\u0021\u00b0\u0027\u003a\u003b\u00dc\u00fc]+$/;// ()",./""%¡!°':;
   
       if(pasoValido.match(pattern)){
           valido = true
       }
       else{
           if(pasoValido == ""){
               alert("No se aceptan campos vacíos en la preparación.")
               i=contadorPasos+1
               return valido = false;
           }else{
               //Tambien acepta ""
               alert("Solo se aceptan caracteres alfanuméricos en los pasos y los siguientes caracteres especiales: ( ) ,  . / % ¡ ! ° ' : ; \u0022")
               i=contadorPasos+1
               valido = false;
           }
       }
       //-----CONTROLA CANTIDAD DE PALABRAS EN PASOS------------
           //Reemplazamos los saltos de linea por espacios
           var texto = pasoValido.replace (/\r?\n/g," ");
           //Reemplazamos los espacios seguidos por uno solo
           texto = texto.replace (/\s\s+/g," ");
           //Quitarmos los espacios del principio y del final
           texto = texto.replace (/^ /,"");
           texto = texto.replace (/ $/,"");
           //Troceamos el texto por los espacios
           console.log(texto)
           var textoTroceado = texto.split (" ");
           //Contamos todos los trozos de cadenas que existen
           var numeroPalabras = textoTroceado.length;
           //Mostramos el número de palabras
           if(numeroPalabras>80){
               alert("la cantidad máxima de palabras aceptadas para pasos es de 80");
               valido=false;
               i=contadorPasos+1
           }else{
               if(textoTroceado[0] == ""){
                       alert("No se permiten solo espacios como un paso");
                       valido=false;
                       i=contadorPasos+1
               }else{
               
                   if(numeroPalabras<3){
                       alert("la cantidad mínima de palabras aceptadas para pasos es de 3");
                       valido=false;
                       i=contadorPasos+1
                   }
               }
           }
    }
return valido
}


//----------VALIDACION DE DESCRIPCION--------
function validarDescripcion(){
    var controlar = true;
   var texto = document.getElementById("descripcion").value;
   descripcion = texto;
    if(texto == ""){
        alert("No se aceptan campos vacíos en descripción.")
        return controlar = false;
    }
    //Reemplazamos los saltos de linea por espacios
    texto = texto.replace (/\r?\n/g," ");
    //Reemplazamos los espacios seguidos por uno solo
    texto = texto.replace (/[ ]+/g," ");
    //Quitarmos los espacios del principio y del final
    texto = texto.replace (/^ /,"");
    texto = texto.replace (/ $/,"");
    //Troceamos el texto por los espacios
    var textoTroceado = texto.split (" ");
    //Contamos todos los trozos de cadenas que existen
    var numeroPalabras = textoTroceado.length;
    //Mostramos el número de palabras
    if(numeroPalabras>100){
        alert("La cantidad máxima de palabras aceptadas para descripción es de 100");
        controlar=false;
    }else{
        if(textoTroceado[0] == ""){
            alert("No se permiten solo espacios como descripción");
            controlar=false;
            i=contadorValor+1
        }else{
            if(numeroPalabras<10){
                alert("La cantidad mínima de palabras aceptadas para descripción es de 10");
                controlar=false;
            }
        }
        
    }
    return controlar;
}


function validar_cat(){
    var controlar = true;
    var texto = document.getElementById("nuevaCat").value;
    var pattern = /^[A-Za-z\s\u002c\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00dc\u00fc]+$/;//,
       if(texto.match(pattern)){
           controlar = true
       }
       else{
           if(texto == ""){
               alert("No se acepta campo vacío para nueva categoría.")
               return controlar = false;
           }else{
               //Tambien acepta ""
               alert("Solo se aceptan caracteres alfabeticos y “,” en categoría.")
                return controlar = false;
           }
       }
     //Reemplazamos los saltos de linea por espacios
     texto = texto.replace (/\r?\n/g," ");
     //Reemplazamos los espacios seguidos por uno solo
     texto = texto.replace (/[ ]+/g," ");
     //Quitarmos los espacios del principio y del final
     texto = texto.replace (/^ /,"");
     texto = texto.replace (/ $/,"");
     //Troceamos el texto por los espacios
     var textoTroceado = texto.split (" ");
     //Contamos todos los trozos de cadenas que existen
     var numeroPalabras = textoTroceado.length;
     //Mostramos el número de palabras
     if(numeroPalabras>4){
         alert("La cantidad máxima de palabras aceptadas para nueva categoría es de 4");
         controlar=false;
     }else{
         if(textoTroceado[0] == ""){
             alert("No se permiten solo espacios como nueva categoría");
             valido=false;
         }else{
             if(numeroPalabras<1){
                 alert("La cantidad mínima de palabras aceptadas paranueva categoría es de 1");
                 controlar=false;
             }
         }
         
     }
     return controlar;
 }    


//---------VERIFICAR CAMPO CATEGORIA----------
var tipo= document.getElementById("tipos");

tipo.addEventListener('change',function(){
    let valor=tipo.value;
    if(valor==1){
        if(maxCat==20){
            alert("No se puede registrar nueva categoría (límite máximo alcanzado)");
            var a = document.getElementById("tipos")
            a.selectedIndex = 0;
        }else{
            agregarCat();
        }
    }else if(contadorcat==1){
        casilla = document.getElementById("nuevaCat");	
        casilla.parentNode.removeChild(casilla);
        contadorcat=0;
    } 
})

var contadorcat=0;

function agregarCat(){
    if(contadorcat==0){
        const aniadir = document.getElementById("tipos")
        aniadir.insertAdjacentHTML("afterend", '<br><input class="ingresarCat" id="nuevaCat" placeholder="Ingrese categoría"/>');
        contadorcat=1;
    }
}

var nombreDolor;
function verificarCateg() {
    var ban;
    var col = document.getElementById('tipos');
    if (col.value==0) {
        alert("Categoría no seleccionada");
        ban=false;
    }else if(col.value == 1){
        if(validar_cat()){
            nombreDolor= document.getElementById("nuevaCat").value;
            nombreDolor = nombreDolor.toLowerCase();
            nombreDolor = nombreDolor[0].toUpperCase()+nombreDolor.slice(1);
            nombreDolor = nombreDolor.replace (/,,+/g,",");
            nombreColeccion=nombreDolor;
            ban=true;
        }
    }else{
        nombreColeccion=col.value;
        nombreDolor=nombreColeccion;
        ban=true;
    }
    return ban;
}

function validarImgCat() {
    if (!verificarCateg()) {
        tituloAniadido = ""
        ingredienteAñadido = ""
        pasoAñadido = ""
        descripcion = ""
    } else if (imgCargada) {
        //aqui es posible guardar en la BD
       subirImagen(nombreColeccion);
    } else {
        alert("Es necesario subir una imagen")
        tituloAniadido = ""
        ingredienteAñadido = ""
        pasoAñadido = ""
        descripcion = ""
    }
}

function subirImagen(carpeta) {
    var imagenASubir = imagenPintada;
    var uploadTask = storageRef.child('Dolores/'+carpeta + '/' +imagenASubir.name).put(imagenASubir);
  // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
       (snapshot) => {
           console.log("cargando")
           document.getElementById("botonReg").disabled = true;
  
       },
       (error) => {
           // A full list of error codes is available at
           // https://firebase.google.com/docs/storage/web/handle-errors
           switch (error.code) {
               case 'storage/unauthorized':
                   // User doesn't have permission to access the object
                   break;
               case 'storage/canceled':
                   // User canceled the upload
                   break;
               case 'storage/unknown':
                   // Unknown error occurred, inspect error.serverResponse
                   break;
           }
       },
       () => {
           // Upload completed successfully, now we can get the download URL
           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               //console.log('File available at', downloadURL);
               console.log("se subio imagen correctamente")
               registarReceta(downloadURL, carpeta);
           });
       }
   );
}



function registrar() {
    var tituloAniadido = document.getElementById("titulo").value;
    
    console.log(controlar, "final");
    console.log(tituloAniadido,"fina");
    if (controlar == true) {
        if (validacion_titulo(tituloAniadido) == true &&
            contar_palabras_titulo(tituloAniadido) == true && validacion_ingredientes() == true &&
            validacion_pasos() == true && validarDescripcion() == true) {

            juntarIngredientes()
            juntarPasos()
            
            validarImgCat()
            console.log(tituloAniadido,"finalista");

        } else {
            tituloAniadido = ""
            ingredienteAñadido = ""
            pasoAñadido = ""
            descripcion = ""
        }
    } else {
        controlar = true;
        alert("La receta ya se encuentra registrada en la base de datos.")
        tituloAniadido = ""
        ingredienteAñadido = ""
        pasoAñadido = ""
        descripcion = ""
        location.reload()
    }
}

function registarReceta(url, coleccion) {
    //Variables que recuperan el titulo
    var tituloAniadido = document.getElementById("titulo").value;
    //Reemplazamos los saltos de linea por espacios
    tituloAniadido = tituloAniadido.replace (/\r?\n/g," ");
    //Reemplazamos los espacios seguidos por uno solo
    tituloAniadido = tituloAniadido.replace (/[ ]+/g," ");
    //Quitarmos los espacios del principio y del final
    tituloAniadido = tituloAniadido.replace (/^ /,"");
    tituloAniadido = tituloAniadido.replace (/ $/,"");
    //Reemplazar comas
    tituloAniadido = tituloAniadido.replace (/,,+/g,",");
    //Todo a minuscula
    tituloAniadido = tituloAniadido.toLowerCase();
    tituloAniadido = tituloAniadido[0].toUpperCase()+tituloAniadido.slice(1);
    //tituloAniadido = tituloAniadido.charAt(0).toUpperCase() 
    ingredienteAñadido = ingredienteAñadido.replace (/,,+/g,",");
    pasoAñadido = pasoAñadido.replace (/,,+/g,",");
    //Descripcion primera a mayuscula
    descripcion = descripcion.toLowerCase();
    descripcion = descripcion[0].toUpperCase()+descripcion.slice(1);
    descripcion = descripcion.replace (/,,+/g,",");
console.log(tituloAniadido, "ultimo ultimito");
    if(contadorcat==1){
        crearDoc(coleccion, url,  tituloAniadido , ingredienteAñadido, pasoAñadido, descripcion);
      
    }else{
        db.collection("Dolores").where("Dolor", "==", nombreDolor).get().then((results) => {
            console.log("se encontro");
            const data = results.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            var ide = data[0].id
            console.log(ide);
            aniadirCol(ide, url, tituloAniadido , ingredienteAñadido, pasoAñadido, descripcion);
        })
        .catch((error) => {
            console.error("No se encontro documento ", error);
        });
       
    }
    
}

function crearDoc(col, url,  tituloAniadido, ingredienteAñadido, pasoAñadido, descripcion){
    db.collection("Dolores").where("Dolor", "==", col).get().then((results) => {
        const data = results.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        var dolexiste = data[0].id
        console.log("dolexiste", dolexiste)
        aniadirCol(dolexiste, url, tituloAniadido , ingredienteAñadido, pasoAñadido, descripcion);
    })
    .catch((error) => {
        //console.error("No se encontro documento ", error);;
        db.collection("Dolores").add({
            Dolor: col
         })
         .then((docRef) => {
             console.log("Document written with ID: ", docRef.id);
             aniadirCol(docRef.id, url, tituloAniadido , ingredienteAñadido, pasoAñadido, descripcion);
         })
         .catch((error) => {
             console.error("Error adding document: ", error);
         });
    });

}

function aniadirCol(ide, url,  tituloAniadido , ingredienteAñadido, pasoAñadido, descripcion){
    db.collection("Dolores").doc(ide).collection("Remedios").add({
        Nombre: tituloAniadido,
        Ingredientes: ingredienteAñadido,
        Preparacion: pasoAñadido,
        Descripcion: descripcion,
        Imagen: url
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Se realizo el registro correctamente!!!")
        location.reload()
    })
    .catch((error) => {
        console.error("Error adding document and collection: ", error);
    });  
}



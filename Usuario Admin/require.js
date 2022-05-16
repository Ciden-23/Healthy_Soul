const fs = require('fs');
//import fs from 'fs';

let archivo = fs.readFileSync('dolencias.txt', 'utf-8');
console.log(archivo);


console.log('Esto se muestra después de haber leído el achivo2.txt (por el readFileSync)');
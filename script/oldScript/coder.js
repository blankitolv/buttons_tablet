// ------- SECTOR DE NOTAS ------------
// selecciono el sector
const header__lucas=document.querySelector('.player-view-wrapper')

//creo el div contenedor
const div__lucas=document.createElement('DIV');

// asigno id "div__lucas" al div
div__lucas.id= 'div__lucas'

// ------- TITULO DE LAS NOTAS ---------
// creo un titulo para la cabecera 
const h2__lucas=document.createElement('H2');

// ASIGNO EL TITULO
h2__lucas.innerHTML=`NOTAS DEL ALUMNO`

// INSERTO EL DIV EN LA PAGINA
header__lucas.appendChild(div__lucas);

// INSERTO EL TITULO EN EL DIV
div__lucas.appendChild(h2__lucas);

// ------- BOTON ----------
//CREO EL BOTON DE AGREGAR NOTA
const addButton__lucas = document.createElement ('BUTTON')
// ** actualizacion cambiar button por submit y agregarle al evento preventdefault
// ************

//CREO UN ID PARA EL BOTON
addButton__lucas.id='agregaNota'

//LE PONGO UN TEXTO AL BOTON
addButton__lucas.innerHTML = "Agregar Nota"

// INSERTO EL BOTON EN EL DIV
div__lucas.appendChild(addButton__lucas)

// -------- CREANDO CAJA DE INPUT ----------
const inputNota__lucas = document.createElement ('INPUT');
inputNota__lucas.type = 'text';
inputNota__lucas.id='inputNota';
div__lucas.appendChild(inputNota__lucas);
// -------- 2do Div --------
const divNotas__lucas=document.createElement('DIV');
divNotas__lucas.id='divNotas';
divNotas__lucas.setAttribute("style", "overflow-y: auto;height: 70vh;");
div__lucas.appendChild(divNotas__lucas)


// -------- LOCALSTORAGE -----------

class NotasClase {
     //agregar id como param
     constructor (id,hora,nota){
          this.id=id;
          this.hora=hora;
          this.nota=nota;
     }
}
// extraigo el titulo de coderhouse por tagname -> tomo el 0 -> borro los espacios -> lo corto
let nameLS=document.getElementsByTagName ('title')[0].innerHTML.replace(/ /g,"").slice(0,11);
if (localStorage.getItem(`${nameLS}`)) {
     var arrayNotas=JSON.parse(localStorage.getItem(`${nameLS}`));
} else {
     var arrayNotas=[]
     localStorage.setItem(`${nameLS}`,JSON.stringify([]));
}
//agregar id como param
function enviaLS(notaObjeto){
     // let arrayNotas=[];
     // arrayNotas=JSON.parse(localStorage.getItem(`${nameLS}`));
     let arrayNotas2=JSON.parse(localStorage.getItem(`${nameLS}`));
     arrayNotas2.push(notaObjeto)
     localStorage.setItem(`${nameLS}`,JSON.stringify(arrayNotas2));
     console.log(arrayNotas2);
}
// busca la palabra en LS
// -------- eventoBorrar nota ------
function agregaEventoBorrar(){
     let btn_borrar=document.querySelectorAll('.botonx');
     btn_borrar.forEach(element => {
          element.addEventListener('click',funcBorrar)
          function funcBorrar(e){
               e.preventDefault();
               let previus=element.previousElementSibling.innerHTML;
               previusNota=previus.slice(10,previus.length);
               previusHora=previus.slice(0,8);
               element.parentNode.remove();
               console.log ('*****************************')
               let lsViejo=JSON.parse(localStorage.getItem(`${nameLS}`));
               let lsNuevo=[];
               let count=0;
               lsViejo.forEach(element => {
                    if (element.nota != previusNota) {
                         element.id=count;
                         lsNuevo.push(element)
                         count++;
                    }
               });
               console.log ('length Viejo '+lsViejo.length)
               console.log ('length Nuevo '+lsNuevo.length)
               localStorage.setItem(`${nameLS}`,JSON.stringify(lsNuevo));
          }       
     })
     agregaEstilo();
}
function agregaEstilo(){
     let aux= document.querySelectorAll('.cadaNota');
     aux.forEach(element => {
          element.style.display="flex";
          element.style.justifyContent = "space-around";
          element.style.alignItems = "baseline"
     })
     

}
if (localStorage.getItem(`${nameLS}`)) {
     let idNumero=JSON.parse(localStorage.getItem(`${nameLS}`)).length;
     let oldNotes=JSON.parse(localStorage.getItem(`${nameLS}`));
     if ( idNumero.length != null || idNumero.length != undefined || idNumero.length != 0 ) {
          console.log (oldNotes);
          oldNotes.forEach(oneNote => {
               let ahora2=oneNote.hora;
               let laNota2=oneNote.nota;
               console.log (oneNote.hora+" "+oneNote.nota);

               // CREO UN DIV PARA CADA NOTA
               let cadaNota2=document.createElement('DIV');
               cadaNota2.className='cadaNota';
               //CREO ETIQUETA P DONDE VA EL TEXTO DE LA NOTA
               let pNota2=document.createElement ('P');
               // MUESTRO LA HORA Y LA NOTA
               pNota2.innerHTML=`${ahora2}: ${laNota2}`
               cadaNota2.appendChild(pNota2);
               //CREO EL BOTON DE BORRAR NOTA 
               const botonx=document.createElement('BUTTON');
               botonx.className='botonx';
               botonx.innerHTML='x';
               botonx.style.height = "20px";
               cadaNota2.appendChild(botonx);
               divNotas__lucas.appendChild(cadaNota2);
               agregaEventoBorrar();
          });
     }
}
// -------- EVENTO NOTA ----
agregaNota.addEventListener('click',()=> {
     // GUARDO LA HORA DE LA NOTA
     let ahora=document.querySelector('.vjs-time-range-current');
     // CREO UN DIV PARA CADA NOTA
     let cadaNota=document.createElement('DIV');
     cadaNota.className='cadaNota';
     //CREO ETIQUETA P DONDE VA EL TEXTO DE LA NOTA
     let pNota=document.createElement ('P');
     let laNota=document.querySelector('#inputNota');
     // MUESTRO LA HORA Y LA NOTA
     pNota.innerHTML=`${ahora.innerHTML}: ${laNota.value}`
     cadaNota.appendChild(pNota);
     //CREO EL BOTON DE BORRAR NOTA 
     const botonx=document.createElement('BUTTON');
     botonx.className='botonx';
     botonx.innerHTML='x';
     botonx.style.height = "20px";
     cadaNota.appendChild(botonx);
     divNotas__lucas.appendChild(cadaNota);
     let idNumero=JSON.parse(localStorage.getItem(`${nameLS}`)).length;
     // let articulo = new Articulos ((dataCarta.querySelector("H5").textContent),(carta.querySelector("img").src),(dataCarta.querySelector("I").textContent),1)
     let notaObjeto = new NotasClase (idNumero,ahora.innerHTML,laNota.value)
     //      localStorage.setItem(`${nameLS}`,JSON.stringify(arrayNotas));
     enviaLS(notaObjeto);
     laNota.value='';
     agregaEventoBorrar();

})
// -estás en agregarEventoBorrar AHORA lo que tenes que hacer es con el previusSibling buscar ese texto en el arreglo y borrarlo y actualizar
// localStorage
// también podrías pensar en separa el P en dos SPAN para tener acceso solamente a los p y buscarlos directamente en el arreglo
// SINO podés utilizar SLICE para borrar la hora slice() OJO talvez tenes TODO guardado y no tenes que hacer SLICE checkia nota del objeto
// -tenes que volcar el localStorage primero
// fijate si podés hacer un scroll
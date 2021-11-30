//variables globales
//
//cantidad de botones
let cantidad_botonera=9;

// data del fetch
let allData;

// botones agregados
let buttonsAdded=[];

// nombre del archivo a exportar
let nombreArchivo= 'code.py'

// texto Base
texto=`
import time \n
import digitalio \n
import board \n
import usb_hid \n
from adafruit_hid.keyboard import Keyboard \n
from adafruit_hid.keycode import Keycode \n
\n
boton1_pin = board.GP28\n
boton2_pin = board.GP2\n
boton3_pin = board.GP5\n
boton4_pin = board.GP27\n
boton5_pin = board.GP11\n
boton6_pin = board.GP7\n
boton7_pin = board.GP19\n
boton8_pin = board.GP17\n
boton9_pin = board.GP14\n
\n
teclado = Keyboard(usb_hid.devices)\n
boton1= digitalio.DigitalInOut(boton1_pin)\n
boton1.direction = digitalio.Direction.INPUT\n
boton1.pull = digitalio.Pull.DOWN\n
\n
boton2= digitalio.DigitalInOut(boton2_pin)\n
boton2.direction = digitalio.Direction.INPUT\n
boton2.pull = digitalio.Pull.DOWN\n
\n
boton3= digitalio.DigitalInOut(boton3_pin)\n
boton3.direction = digitalio.Direction.INPUT\n
boton3.pull = digitalio.Pull.DOWN\n
\n
boton4= digitalio.DigitalInOut(boton4_pin)\n
boton4.direction = digitalio.Direction.INPUT\n
boton4.pull = digitalio.Pull.DOWN\n
\n
boton5= digitalio.DigitalInOut(boton5_pin)\n
boton5.direction = digitalio.Direction.INPUT\n
boton5.pull = digitalio.Pull.DOWN\n
\n
boton6= digitalio.DigitalInOut(boton6_pin)\n
boton6.direction = digitalio.Direction.INPUT\n
boton6.pull = digitalio.Pull.DOWN\n
\n
boton7= digitalio.DigitalInOut(boton7_pin)\n
boton7.direction = digitalio.Direction.INPUT\n
boton7.pull = digitalio.Pull.DOWN\n
\n
boton8= digitalio.DigitalInOut(boton8_pin)\n
boton8.direction = digitalio.Direction.INPUT\n
boton8.pull = digitalio.Pull.DOWN\n
\n
boton9= digitalio.DigitalInOut(boton9_pin)\n
boton9.direction = digitalio.Direction.INPUT\n
boton9.pull = digitalio.Pull.DOWN\n
`;
// !! falta agregar el while armado


// guarda el texto, recibe como parametro el texto YA ARMADO (arriba)
function download(filename, texto) {
     var element = document.createElement('a');
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
     element.setAttribute('download', filename);
 
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();
}
//cuando hace click envia nombre del archivo y el texto armado como argumento
document.getElementById("dwn-btn").addEventListener("click", function(){
// Generate download of hello.txt file with some content
// var textArea = document.getElementById("textArea").value;
let filename = `${nombreArchivo}`;

download(filename, texto);
}, false);


/*
\'	comilla simple
\"	comilla doble
\\	barra invertida
\n	línea nueva
\r	retorno de carro
\t	tabulación
\b	límite de palabra
\f	fuente de formulario
*/

// selecciona donde va a "appendear" los tr
let tbody_keys=document.querySelector('#tbody_keys');
fetch ('../posible.json')
     .then (res => res.json())
     .then (data => {
          setTimeout(() => {
               allData=data;
          }, 1000);
          data.forEach(element => {
               tbody_keys.innerHTML+=`
               <tr id="${element.id}">
                    <th scope="row">${element.id}</th>
                    <td>${element.keyCode}</td>
                    <td>${element.keyNum}</td>
                    <td>${element.comment}</td>                    
                    <td><input type="checkbox" class="checkKey"></td>
               </tr>
               `
          });
     })

//genera los eventos CHANGE de los checkbox
const addEventsCheck =()=>{
     let allCheck=document.querySelectorAll('.checkKey');
     allCheck.forEach(element => {
          element.addEventListener('change',(e)=>{
               e.preventDefault();
               if ( buttonsAdded.length >= cantidad_botonera ){
                    e.target.checked=false;
               }
               //envía como argumento el ID del padre del que se hizo un check
               agregarBoton((element.parentNode.parentNode).firstElementChild.innerHTML,e);
          })
     });
}

//recibe el ID y el EVENTO para corroborar que esté check o uncheck
const agregarBoton=(num_boton,e)=>{
     //si está check
     if (e.target.checked) {
          //si tiene menos de [cantidad de botones] botones agregados
          if ( buttonsAdded.length < cantidad_botonera ) {
               //agrega el botón
               buttonsAdded.push(num_boton);
          }
     } else {
          // si el evento es uncheck, lo borra de la botonera
          buttonsAdded = buttonsAdded.filter(x => x != num_boton);
     }
}


// muestra la configuracion por consola
let show_btn = document.querySelector('#show-btn');
show_btn.addEventListener('click',()=>{
     console.log (buttonsAdded);
     buttonsAdded.forEach(element => {
          //muestra el elemento (keyCode) y su ID
          console.log (allData[element-1].keyCode,allData[element-1].id);
     });
})

const borrarTodo=()=>{
     while(liveMacro.firstChild){
          liveMacro.removeChild(liveMacro.firstChild);
     }
}

const appendMacro=(e)=>{
     let liveMacro=document.querySelector('#liveMacro');
     borrarTodo();
     const etiquetaP=document.createElement('DIV');
     array_keyCode=[];
     aprietoKeyCode.forEach(elementPressed => {
          let tieneId=false;
          allData.forEach(elementData => {
               if (elementPressed == elementData.key) {
                    tieneId=true;
                    console.log (elementData.code);
                    array_keyCode.push (elementData.code);
               }
          });
          if ( tieneId == false ){
               aux='key'+e.toUpperCase();
               array_keyCode.push (aux);
          }
     });
     const etiquetaCant=document.createElement('DIV');
     etiquetaCant.innerHTML=`aprieto ${aprieto.length} aprietoKeyCode ${aprietoKeyCode.length} array_keyCode ${array_keyCode.length}`
     etiquetaP.innerHTML=`${aprieto} <br> ${aprietoKeyCode} <br> ${array_keyCode}`;
     liveMacro.appendChild(etiquetaP);
     liveMacro.appendChild(etiquetaCant);
}
//aprieto contiene todos los e.keyCode de js presionados
let aprieto=[];

let estaPresionada=false;

// contiene e.key anterior
let anterior='';

// contiene los e.keyCode presionados
let aprietoKeyCode=[]

// contiene los e.Code presionados
let aprietoCode=[]


// una vez que el dom esté cargado que agregue los eventos de los check
document.onreadystatechange = () => {
     addEventsCheck();
     let macro=document.querySelector('#macro');
     macro.addEventListener('keydown',presionaTecla)
          function presionaTecla(e){
               e.preventDefault();
               if (e.key != anterior){
                    anterior=e.key;
                    console.log ('e.key '+e.key);
                    console.log ('e.code '+e.code);
                    console.log ('e.keyCode '+e.keyCode);
                    // console.log (e);
                    aprieto.push(e.key);
                    aprietoCode.push(e.code)
                    aprietoKeyCode.push(e.keyCode);
                    appendMacro(e.key);
               }
          }
     let limpiar=document.querySelector('#limpiarMacro')
     limpiar.addEventListener('click',()=>{
          aprieto=[];
          anterior='';
          aprietoKeyCode=[];
          borrarTodo();
     })
     macro.addEventListener('keyup',sueltaTecla)
     function sueltaTecla(e){
          if (anterior == e.key) {
               anterior=''
          }
     }
}
let showMacro=document.querySelector('#muestraMacro')
showMacro.addEventListener('click',()=>{
     console.log ('aprieto')
     console.warn (aprieto);
     console.log ('array_keyCode')
     console.warn (array_keyCode);

})


// let btn_up=document.querySelector('#btn_up');
// btn_up.addEventListener('click',()=> {
     
//      setTimeout(() => {
//           console.log (texto);          
//           subirAca();
//      }, 1000);
// })

// const subirAca=()=>{
//      let aca=document.querySelector('#subirAca');
//      aca.innerHTML=`${texto}`
     
// }
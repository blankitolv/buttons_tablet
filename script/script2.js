let bdKeyMap=[];
let macro=[];
// va a contener todos los macros, va a tener el largo igual a la cantidad de botones que tenga la botonera
let containerMacros=[];
// base de datos
fetch ('../bdKeyMap.json')
     .then (response => response.json() )
     .then (data => bdKeyMap=data)
     .finally( () => console.log ('base de datos cargada/finalizada'));




// TODAS LAS TECLAS
let allButtons = document.querySelectorAll('.btnLigth');
allButtons.forEach(element => {
     element.addEventListener('click',hizoClick)
     function hizoClick(e) {
          e.preventDefault();
          let keyPressed= bdKeyMap.find (key => key.id == element.id)
          macro.push(keyPressed.keyCode);
          console.log ('mcro: '+macro.length);
          if (macro.length>6) {
               let buttonSendFunction=document.querySelector('#buttonSendFunction');
               buttonSendFunction.disabled=true;
          }
     }
});
function nuevaSeleccion() {
     buttonSendFunction.disabled=false;
     macro=[];
     position=null;
     tecladoPantalla.className='ocultarTeclado'
}




// MACROS DE TECLADO ***
let buttonSendMacro=document.querySelector('#buttonSendMacro');
buttonSendMacro.addEventListener('click',(e)=>{
     e.preventDefault();
     addToBaseScriptRealMacro(macro)
})
const addToBaseScriptRealMacro=(paramMacro)=>{
     let funcMacro='';
     paramMacro.forEach(tecla => {
          funcMacro+=`teclado.press(Keycode.${tecla})\n\t\tteclado.release(Keycode.${tecla})\n\t\t`;
     });

     containerMacros[position-1]=funcMacro;
     // macro=[];
     noSelection()
     nuevaSeleccion();
}

// **************************************************************
// FUNCIONES DE TECLADO
let buttonSendFunction=document.querySelector('#buttonSendFunction');
buttonSendFunction.addEventListener('click',(e)=>{
     e.preventDefault();
     if ( macro.length > 6 ) {
          console.log ('Error no se pueden hacer funciones de más de 6 teclas')
          macro=[];
          bdKeyMap=[];
     } else {
          addToBaseScript(macro)
     }
})
const addToBaseScript=(parammacro)=>{
     let cant=0;
     let allMacro='teclado.press(';
     let onlyKey='';
     parammacro.forEach(tecla => {
          allMacro+=` Keycode.${tecla}${cant!=parammacro.length-1?',':''}`
          onlyKey+=` Keycode.${tecla}${cant!=parammacro.length-1?',':''}`
          cant++;
     });

     allMacro+=`) \n`;
     allMacro+=`\t\ttime.sleep(0.1)\n\t\tteclado.release(${onlyKey})\n\t\ttime.sleep(0.1)\n`;
     console.log ('function Guardada');
     containerMacros[position-1]=allMacro;
     macro=[];
     noSelection()
     console.log (macro.length);
}
// oculta la posibilidad de que vuelva a establecer la misma macro
const noSelection=()=>{
     let keyCaps=document.querySelectorAll('input[name="keyCaps"]')
     keyCaps.forEach(tecla => {
          if (tecla.id==position) {
               tecla.disabled=true;
               nuevaSeleccion();
               // position=null;
               // tecladoPantalla.className='ocultarTeclado'
          }
     });
}






let position=null;
let tecladoPantalla = document.querySelector('#teclado');

     // if (position===null) {
     //      if(document.querySelector('input[name="keyCaps"]')){
     //           document.querySelectorAll('input[name="keyCaps"]').forEach((elem) => {
     //                elem.addEventListener("click", function(event){
     //                     console.log (event);
     //                     position=elem.id;
     //                     console.log ('se guardara en la posicion '+position);
     //                     tecladoPantalla.className='teclado  mostrarTeclado'
     //                });
     //           });
     //      } 
     //      nuevaSeleccion();
     //      // tecladoPantalla.className='ocultarTeclado'
     // }
document.querySelectorAll('input[name="keyCaps"]').forEach((elem) => {
     elem.addEventListener("click", function(){
          position=elem.id;
          tecladoPantalla.className='teclado  mostrarTeclado'
     });
});

nuevaSeleccion();
// tecladoPantalla.className='ocultarTeclado'



function download(filename, texto) {
     var element = document.createElement('a');
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
     element.setAttribute('download', filename);
 
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();
}
// nombre del archivo a exportar
let nombreArchivo= 'code.py'

let btnFinaliza = document.querySelector('#finaliza');
btnFinaliza.addEventListener('click',()=> {
     for (let i=0;i<=8;i++){
          if (containerMacros[i]!=undefined){
               texto+=`\tif boton${i+1}.value:\r\t\t${containerMacros[i]}\n`
          }
     }
     let filename = `${nombreArchivo}`;
     download(filename, texto);
})

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
\n
while True:
`;

/*


while True:
    if boton1.value:
        print("COPIAR TEXTO")
        teclado.press(Keycode.CONTROL, Keycode.C)
        time.sleep(0.1)
        teclado.release(Keycode.CONTROL, Keycode.C)
        time.sleep(0.1)

\'	comilla simple
\"	comilla doble
\\	barra invertida
\n	línea nueva
\r	retorno de carro
\t	tabulación
\b	límite de palabra
\f	fuente de formulario


*/
/*
example
key 6 = C
we need -> Keycode.C

from adafruit_hid.keycode import Keycode

# Press ctrl-x.
kbd.press(Keycode.LEFT_CONTROL, Keycode.X)

# Or, more conveniently, use the CONTROL alias for LEFT_CONTROL:
kbd.press(Keycode.CONTROL, Keycode.X)

# Press a, b, c keys all at once.
kbd.press(Keycode.A, Keycode.B, Keycode.C)
*/
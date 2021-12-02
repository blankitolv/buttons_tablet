let inputKey=document.querySelector('#inputKey');
let consola=document.querySelector('.consola')
let cant_teclas=document.querySelector('.cant_teclas')

//captura el evento keydown del teclado [inputs]
inputKey.addEventListener('keydown',(e)=>{
     e.preventDefault();
     if (e.repeat==false){
          consola.innerHTML+=`<a href="#" class="a_button" id="${document.querySelectorAll('.consola a').length}"><kbd>${e.key}</kbd></a>`
          cant_pulsaciones();
     }
})
//numero que pone la cantidad de pulsaciones [cant_teclas]
// (borra el existente y agrega el nuevo)
const cant_pulsaciones=()=>{
     while(cant_teclas.firstChild){
          cant_teclas.removeChild(cant_teclas.firstChild);
     }
     cant_teclas.innerHTML=`<p>${document.querySelectorAll('.a_button').length}</p>`

     generaEventosA_Button()
}


//global
let array_desdeHasta=[];


const generaEventosA_Button=()=>{
     let allBotones = document.querySelectorAll('.a_button');
     allBotones.forEach(element => {
          element.addEventListener('click',()=>{
               // array_desdeHasta va a tener 2 posiciones
               // si es igual a 1 agrega
               if (array_desdeHasta.length<=1){
                    if (element.id==array_desdeHasta[0]) {
                         array_desdeHasta.pop();
                    } else {
                         console.log(array_desdeHasta.length); 
                         console.log('add');
                         array_desdeHasta.push(element.id);
                    }
               } else {
                    // si tiene más de 2 borra el ultimo y agrega otro
                    if (parseInt(element.id)>parseInt(array_desdeHasta[0]) && parseInt(element.id)>parseInt(array_desdeHasta[1])){
                         array_desdeHasta.pop();
                         array_desdeHasta.push(element.id);
                    } else if (parseInt(element.id)<array_desdeHasta[0] && parseInt(element.id)<array_desdeHasta[1]){
                         array_desdeHasta.shift();
                         array_desdeHasta.unshift(element.id)
                    }
                    else if (element.id==array_desdeHasta[0]) {
                         array_desdeHasta[0]=String(parseInt(array_desdeHasta[0])+1)
                    } else if (element.id==array_desdeHasta[1]) {
                         array_desdeHasta[1]=String(parseInt(array_desdeHasta[1])-1)
                    } else {
                         array_desdeHasta.pop();
                         array_desdeHasta.push(element.id);
                    }
               }
               if (array_desdeHasta[0]==array_desdeHasta[1]){
                    array_desdeHasta.pop();
               }
               console.log ('desdehasta');
               console.log (array_desdeHasta);
               // (1) si el arreglo tiene 2 elementos
               if (array_desdeHasta.length==2) {
                    // (2) y la posicion [0] es más grande que la [1] -> lo invierte
                    if (parseInt(array_desdeHasta[0])>=parseInt(array_desdeHasta[1])){
                         let aux=array_desdeHasta[0];
                         array_desdeHasta[0]=array_desdeHasta[1];
                         array_desdeHasta[1]=aux;
                    }
               }
               console.log ('desdeHasta');
               console.log(array_desdeHasta);
               allBotones.forEach(unBoton => {
                    if ((parseInt(unBoton.id)>=parseInt(array_desdeHasta[0]) && parseInt(unBoton.id)<=parseInt(array_desdeHasta[1])) || unBoton.id===array_desdeHasta[0] ){
                         unBoton.firstElementChild.className='a_verde'
                         
                    } else {
                         unBoton.firstElementChild.classList.remove("a_verde")
                         unBoton.firstElementChild.className='a_Sinverde'
                    }
               });
          });
     });
}

// selecciona los botones que están seleccionados
let pressJuntos=document.querySelector('#pressJuntos');
pressJuntos.addEventListener('click',()=>{
     let allBotones = document.querySelectorAll('.a_button');
     let cant=0;
     allBotones.forEach(element => {
          if (element.firstChild.className=='a_verde') {
               console.log (`encontré ${++cant} - ${element.textContent}`);
          }
     });
})

// si preciona [resetear seleccion] cambia las clases y reestablece el array
let pressReset=document.querySelector('#pressReset');
pressReset.addEventListener('click',(e)=>{
     e.preventDefault();
     array_desdeHasta=[];
     let allBotones = document.querySelectorAll('.a_button');
     allBotones.forEach(element => {
          if (element.firstChild.className=='a_verde') {
               element.firstChild.className="a_Sinverde";
          }
     });
})
fetch ('../bdKeyMapInput.json')
.then (resp=> resp.json())
.then (data => {
     setTimeout(() => {
          allDataKeyboard=data;
          finalmente()
     }, 1000);
})

function finalmente() {
     allDataKeyboard.forEach(ele => {
          console.log (ele.ekey.length);
     })
}

// print screen no tiene e.key
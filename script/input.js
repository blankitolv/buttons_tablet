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
const cant_pulsaciones=()=>{
     while(cant_teclas.firstChild){
          cant_teclas.removeChild(cant_teclas.firstChild);
     }
     cant_teclas.innerHTML=`<p>${document.querySelectorAll('.a_button').length}</p>`
     generaEventosA_Button();
}
const generaEventosA_Button=()=>{
     let allBotones = document.querySelectorAll('.a_button');
     allBotones.forEach(element => {
          element.addEventListener('click',()=>{
               // si el primer elemento de a tiene a_verde
               // se lo sacamos
               // if (element.firstElementChild.className=='a_verde') {
               //      element.firstElementChild.className='';
               // } else {
               //      // sino se lo agregamos
               //      element.firstElementChild.className+='a_verde';
               // }

               if (array_desdeHasta.length<=1){
                    console.log(array_desdeHasta.length); 
                    console.log('add');
                    array_desdeHasta.push(element.id);
               } else {
                    console.log('pop y add');
                    array_desdeHasta.pop();
                    array_desdeHasta.push(element.id);
               }
               console.log ('desdehasta');
               console.log (array_desdeHasta);
               allBotones.forEach(unBoton => {
                    if (unBoton.id==array_desdeHasta[0] || unBoton.id==array_desdeHasta[1]){
                         console.log ('uno');
                         unBoton.firstElementChild.className='a_verde'
                    } else {
                         unBoton.firstElementChild.classList.remove("a_verde")
                    }
               });
          });
     });
     
}
//global
let array_desdeHasta=[];
const desdeHasta=(pos)=>{
     // array_desdeHasta.push
     console.log ('hiciste click en la posicion '+pos)

}
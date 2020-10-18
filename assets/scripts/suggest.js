let gifs1 = document.querySelector(".gifs1");
let offset = 100;

// FETCH DE SUGERENCIAS
function getApi() {
    fetch(urlTrending + "&offset=" + offset ) 
        .then(resolve => resolve.json())
        .then(res => {
            res.data.forEach(test);            
            function test(value, index) {
                i = index;
                let cont = gifs1.children;
                if(cont.length === 4){
                    return false;
                }
                let img = value.images["original"]["url"];
                let title = value.title;
                gifCards(title, img,i);
            }           
        })
}
getApi();

// TEMPLATE PRIMERA FILA DE GIFS

function gifCards(title, img) {
    const newGif = document.createElement('div');      
    const gifTemplate = `
        <div class="cards col-3" id="${i}">
             <div class=" cualquiera">
                     <div class="contenedor- cualquiera ">
                        <h3 class="col-10">#${title}</h3>
                        <button onclick = closeGifs(${i}) ><img src="./assets/images/close.svg" alt="cerrar"></button>
                    </div>                        
                    <div class="bodyCards ">
                            <img src="${img}">
                            <div class="botonsirri"><button class="seeMore" onclick = "seeMoreAction(${i})">ver mas</button></div>
                     </div>
             </div>
        </div>
        `
    newGif.innerHTML = gifTemplate;
    gifs1.appendChild(newGif);
}

// Funcionalidad boton seeMore

function seeMoreAction(i){

    const divSeeMore = document.getElementById(i).childNodes;    
    const divSeeMore2 = divSeeMore[1].childNodes;
    const divSeeMore3 = divSeeMore2[1].childNodes;      
    const divSeeMore4 = divSeeMore3[1];
    
    let titulin = divSeeMore4.innerHTML.slice("1");    
    refresh(titulin);
    getSearchResults(titulin);
}

// Funcion que activa/desactiva displays

function refresh(valor){
    document.querySelector(".today").style.display="none";
    document.querySelector(".gifs1").style.display="none";
    document.querySelector("#section2").style.display="none";
    document.querySelector(".desplegable").style.display="none";        
    document.querySelector("#refresh").style.display="flex";
    const titulo = document.querySelector(".trending");
    titulo.innerHTML = valor;
}  

  
function closeGifs(i){
      
    const divTemplate = document.getElementById(i);
    gifs1.removeChild(divTemplate.parentElement);
    offset = offset + 5;
    getApi();     


}
// estado natural de la barra desplegable
const natural = document.querySelector(".desplegable").style.display = "none";
document.querySelector("#refresh").style.display = "none";
const url = "https://api.giphy.com/v1/gifs/";
const contenedorPlantilla = document.querySelector(".mis_gifos");
const migaleria = document.querySelector("#migaleria");
const seccion1 = document.querySelector(".seccion1");
const seccionMisGifos = document.querySelector("#seccionMisGifos");
seccionMisGifos.style.display="none";




function getSearchResults(search) {
    const api = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey;
    fetch(api)
        .then(resolve => resolve.json())
        .then(res => {            
           res.data.forEach(element => {
                let title = element.title;
                let img = element.images["original"]["url"];
                multiGif3(title, img);
            });
        })
}
function search(){
    const valueButton1 = document.querySelector("#firstSuggest");       
    const valueButton2 = document.querySelector("#secondSuggest");     
    const valueButton3 = document.querySelector("#thirdSuggest");
        
    document.getElementById("button_search").addEventListener("click",  function() {
        let search = document.getElementById("value_search");     
        document.getElementById("lupita").src="/assets/images/lupa.svg";
        document.getElementById("buttonText").style="color: #110038;"
        
       // desplegar menu       
       const natural = document.querySelector(".desplegable").style.display;
        if (natural == "none") {
            document.querySelector(".desplegable").style.display = "inline";
        } else {
            document.querySelector(".desplegable").style.display = "none";            
        }    
        //Asignacion de botones
            
        valueButton1.innerHTML = search.value;           
        valueButton2.innerHTML = " similar a "+ search.value;           
        valueButton3.innerHTML = " otros";          
    });
    valueButton1.addEventListener("click",function () {
        clearScreen();
        let valor = valueButton1.innerHTML;
        refresh(valor);
        getSearchResults(valor);  
        nav2();  
            
    });
    valueButton2.addEventListener("click",function () {
        clearScreen();
        let valor = valueButton2.innerHTML;
        refresh(valor);  
        getSearchResults(valor);
        nav2();
    })
    valueButton3.addEventListener("click",function () {
        clearScreen();
        let valor = valueButton3.innerHTML;
        refresh(valor);   
        getSearchResults(valor);    
        nav2();        
    });

    function refresh(valor){
        document.querySelector(".today").style.display="none";
        document.querySelector(".gifs1").style.display="none";
        document.querySelector("#section2").style.display="none";
        document.querySelector(".desplegable").style.display="none";        
        document.querySelector("#refresh").style.display="flex";        
        const titulo = document.querySelector(".trending");
        titulo.innerHTML = valor;
        }  
}
function multiGif3(title,img) {
    const newGif2 = document.createElement('div');
    const cardContainer = document.querySelector('#refresh');
    const gifTemplate2 = `
            <div class="cards col-3">
                
                    <img  src="${img}" alt="${title}">
                
             </div>                      
    `
    newGif2.innerHTML = gifTemplate2;
    cardContainer.appendChild(newGif2);
}
function clearScreen(){
    const cardContainer = document.querySelector('#refresh');
    cardContainer.innerHTML="";


}
function nav2(){
    document.querySelector(".desplegable").style.display = "flex";
    const bodyNav = document.body;
    bodyNav.id= "hola";
    


}


// esto me lleva mi galeria
function misGifosTemplate(img) {
    const newGif = document.createElement("div");
    const plantilla = `
            <div class="cards col-3 ">
                <img src="${img}" alt="${img}">
            </div>
            `;
    newGif.innerHTML = plantilla;
    contenedorPlantilla.appendChild(newGif);
}
function sectionMisGifos() {
    let idGif = JSON.parse(localStorage.getItem("id"));
    idGif.forEach(miGif);
    function miGif(i) {
        fetch(url + i + "?api_key=" + apiKey)
            .then((response) => response.json())
            .then((res) => {
                let element = res.data;
                let img = element.images.original.url;
                misGifosTemplate(img);
            });
    }
}

migaleria.addEventListener("click",function(){
    seccion1.style.display="none";
    seccionMisGifos.style.display=" flex";
    
    


});







search();
sectionMisGifos();



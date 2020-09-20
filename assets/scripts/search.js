// estado natural de la barra desplegable
const natural = document.querySelector(".desplegable").style.display = "none";
document.querySelector("#refresh").style.display = "none";


function getSearchResults(search) {
    const api = 'http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey;
    fetch(api)
        .then(resolve => resolve.json())
        .then(res => {
            console.log(res)
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
    });
    valueButton2.addEventListener("click",function () {
        clearScreen();
        let valor = valueButton2.innerHTML;
        refresh(valor);  
        getSearchResults(valor);
    })
    valueButton3.addEventListener("click",function () {
        clearScreen();
        let valor = valueButton3.innerHTML;
        refresh(valor);   
        getSearchResults(valor);            
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




search();




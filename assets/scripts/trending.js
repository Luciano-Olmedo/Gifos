// Resto de los gifs
function multiGif(img, title) {
    const newGif2 = document.createElement('div');
    const cardContainer = document.querySelector('.gifs2');
    const gifTemplate2 = `
            <div class="cards3 cualquiera col-3">
                <div class="contenedor- cualquiera">
                <img  src="${img}" alt="${title}">    
                    <div class="containerTitle">
                        <h3 class="titulito">#${title}</h3>
                    </div>
                </div>
            </div>                                     
    `
    newGif2.innerHTML = gifTemplate2;
    cardContainer.appendChild(newGif2);
}

// Cons
function getApi2() {
    fetch(urlTrending2)
        .then(resolve => resolve.json())
        .then(res => {
            res.data.forEach(test);
            function test(value, index) {
                i = index;
                let img = value.images["original"]["url"];
                let title = value.title;
                if (i >= 4 && i <= 7 || i>= 9 && i<= 12) {
                    multiGif(img, title);
                }                
                /*if (i == 4 ) {
                    asd(title, img);
                }        */       
                if (i == 8 ||i == 13 ) {                  
                    multiGif2(img);
                }               
            }
            
        });
}



getApi2();

/*function asd(title, img) {
    document.querySelector(".img").src = img;
    document.querySelector(".img").alt = title;
    document.querySelector(".titulito").innerHTML = "#" + title
}*/
function multiGif2(img, title) {
    const newGif2 = document.createElement('div');
    const cardContainer = document.querySelector('.gifs2');

    const gifTemplate2 = `
        
         <div class="cards2 cualquiera col-6">
                <div class="contenedor- cualquiera">
                <img  src="${img}" alt="${title}">    
                    <div class="containerTitle">
                        <h3 class="titulito">#${title}</h3>
                    </div>
                </div>
            </div>                 
    
    `
    newGif2.innerHTML = gifTemplate2;
    cardContainer.appendChild(newGif2);
}



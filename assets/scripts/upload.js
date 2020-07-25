document.querySelector('.listo').style.display="none";
document.querySelector('#seccion-Video').style.display="none";
document.querySelector('#repeatCapture').style.display="none";
document.querySelector('#uploadGif').style.display="none";


//Funcion Comenzar
function start(){
    document.querySelector('.comenzar').addEventListener("click", function () {
        document.querySelector('#make-Gif').style.display = "none";
        document.querySelector('#seccion-Video').style.display="flex";
    })

}
//Funcion Detener
function stop(){
    document.querySelector('.listo').addEventListener("click",function(){
        document.querySelector('.listo').style.display="none";
        document.querySelector('#repeatCapture').style.display="block";
        document.querySelector('#uploadGif').style.display="block";

    })
}


//Grabar gif
function capture(){
    document.querySelector('.capturar').addEventListener("click",function(){
        document.querySelector('.capturar').style.display="none";
        document.querySelector('.listo').style.display="block";

    })
}

function upload_Gif(){
    document.querySelector('#uploadGif').addEventListener("click",function(){
        

    })
}
upload_Gif();
capture();
start();
stop();

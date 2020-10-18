const apiKey = "qzftyTQIBRxnDfwumT44Gd17LSsZG1zm";
document.querySelector('.listo').style.display = "none";
document.querySelector('#seccion-Video').style.display = "none";
document.querySelector('#repeatCapture').style.display = "none";
document.querySelector('#uploadGif').style.display = "none";
document.querySelector(".seccionGlobo").style.display = "none";
document.querySelector(".cancelar_").style.display = "none";
document.querySelector(".Éxito").style.display = "none"
let enlace = document.querySelector(".enlace");
let descarga = document.querySelector(".descargar");
const contenedorPlantilla = document.querySelector(".mis_gifos");
const video = document.querySelector("#video_init");
const urlUpload = "https://upload.giphy.com/v1/gifs?api_key=" + apiKey;
const url = "https://api.giphy.com/v1/gifs/";
const timer1 = document.querySelector(".timer-input");
timer1.style.display = "none";
let idGif = [];


//Funcion Comenzar
function start() {
    document.querySelector('.comenzar').addEventListener("click", function () {
        document.querySelector('#make-Gif').style.display = "none";
        document.querySelector('#seccion-Video').style.display = "flex";
        document.querySelector("#seccionMisGifos").style.display = "none";
        getStreamAndRecord();
    })
};

//video start
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.play()
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
            });
        })
};

//Funcion Detener
function stop() {
    document.querySelector('.listo').addEventListener("click", function () {
        document.getElementById("titulito_").innerHTML = "Vista Previa"
        document.querySelector('.listo').style.display = "none";
        document.querySelector('#repeatCapture').style.display = "block";
        document.querySelector('#uploadGif').style.display = "block";
        recorder.stopRecording();
        let blob = recorder.getBlob();
        const objectURL = URL.createObjectURL(blob);
        console.log(objectURL);
        stopTimer();
    })
}


//Grabar gif
function capture() {
    document.querySelector('.capturar').addEventListener("click", function () {
        document.getElementById("titulito_").innerHTML = "Capturando Tu Guifo"
        document.querySelector('.capturar').style.display = "none";
        document.querySelector('.listo').style.display = "block";
        timer1.style.display = "block";
        timer();
        recorder.startRecording();
    })
}

function upload_Gif() {
    document.querySelector('#uploadGif').addEventListener("click", function () {
        move();
        document.getElementById("titulito_").innerHTML = "Subiendo Guifo";
        document.querySelector('.videoContainer').style.display = "none";
        document.querySelector(".seccionGlobo").style.display = "block";
        document.querySelector(".cancelar_").style.display = "block";
        document.querySelector('#repeatCapture').style.display = "none";
        document.querySelector('#uploadGif').style.display = "none";
        timer1.style.display = "none";
        let blob = recorder.getBlob();
        let form = new FormData();
        form.append("file", blob, "gif.gif");
        fetch(urlUpload, {
            method: "POST",
            body: form,
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data.meta.status)
                localStorageGif(data);
                if (data.meta.status == 200) {
                    document.querySelector("#id_video").style.display = "none";
                    document.querySelector(".Éxito").style.display = "block";
                    document.querySelector("#seccionMisGifos").style.display = "block";
                    document.querySelector('#seccion-Video').style.margin = "0 0 38px 0"
                }
                else if (data.error) {
                    alert(data.errors);
                } 
                let idGif = JSON.parse(localStorage.getItem("id"));
                let id = idGif[idGif.length-1];
                let urlGif = "https://media.giphy.com/media/" + id + "/giphy.gif";
                document.querySelector("#img_gif_final").src = urlGif
            })
    })
}

// local storage
function localStorageGif(data) {
    if (localStorage.getItem("id") === null) {
        idGif = [];
    } else {
        idGif = JSON.parse(localStorage.getItem("id"));
    }
    idGif.push(data.data.id);
    localStorage.setItem("id", JSON.stringify(idGif));
}

//copiar enlace
enlace.addEventListener("click", function () {
    let idGif = JSON.parse(localStorage.getItem("id"));
    let id = idGif[idGif.length-1];
    let urlGif = "https://media.giphy.com/media/" + id + "/giphy.gif";
    console.log(urlGif);
    var aux = document.createElement('input');
    aux.setAttribute('value', urlGif);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
});

//descargar
descarga.addEventListener("click", function(){
    let blob = recorder.getBlob();
    invokeSaveAsDialog(blob);
});

//estructura template_trend
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

//repetir gif
function repetirGif() {
    window.location.assign("upload.html");
}
//cancelar captura
function cancelarCaptura() {
    window.location.assign("index.html");
}

//timer
var Time;
function timer() {
    DivTimer = document.querySelector(".timer-size");

    Time = setInterval(TimeElapsed, 1000);
    var hour = 0;
    var min = 0;
    var Seconds = 1;
    function TimeElapsed() {
        if (Seconds == 60) {
            Seconds = 0;
            min = min + 1;
        }

        if (min == 60) {
            hour = hour + 1;
        }

        if (Seconds < 10) {
            Seconds = "0" + Seconds;
        }

        TimerText = document.querySelector(".timer-text");
        TimerText.innerHTML = hour + ":" + min + ":" + Seconds;
        Seconds++;
    }
}
function stopTimer() {
    clearInterval(Time);
}
//load
var num = 0;
function move() {
    if (num == 0) {
        num = 1;
        var elem = document.getElementById("file");
        var width = 0;
        var id = setInterval(frame, 50);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.value = width;
            }
        }
    }
}



upload_Gif();
capture();
start();
stop();
sectionMisGifos();

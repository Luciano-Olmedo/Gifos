const menuDesplegable = document.querySelector("#menu_desplegable");
menuDesplegable.style.display = "none";





function buttonDropDown() {

    document.querySelector(".boton2").addEventListener("click", function () {
        selectButton();

    })
    document.querySelector(".boton3").addEventListener("click", function () {
        selectButton();
    })

}


function selectButton() {
    let natural = menuDesplegable.style.display;
    if (natural == "none") {
        menuDesplegable.style.display = "block";
    } else {
        menuDesplegable.style.display = "none";
    }
}

function changeTheme() {
    document.querySelector(".sailorNight").addEventListener("click", function () {
        const bodyTheme = document.body;
        bodyTheme.classList.add("darkBody");
        document.getElementById("logotipo").src = "./assets/images/logodark.png";
        document.getElementById("lupita").src="/assets/images/Combined Shape.svg"
        
    })
    document.querySelector(".sailorDay").addEventListener("click", function () {
        const bodyTheme = document.body;
        bodyTheme.classList.remove("darkBody");
        document.getElementById("logotipo").src = "./assets/images/gifOF_logo.png";
        document.getElementById("lupita").src="/assets/images/lupa_inactive.svg"
    })
}




changeTheme();
buttonDropDown();
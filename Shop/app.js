var ulelements;


onload = (event) =>{   // wird aufgerufen sobald Webseite geladen wird
    ulelements = document.getElementsByClassName("Kategorien");

}


function plus(){
    ulelements.style.display = "invisible";
}

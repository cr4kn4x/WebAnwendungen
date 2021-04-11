var elements1;


onload = (event) =>{   // wird aufgerufen sobald Webseite geladen wird
    elements1 = document.getElementsByClassName("elements");

}


function show(){
    console.log(elements1[0])
    elements1.style.display = "invisible";
}

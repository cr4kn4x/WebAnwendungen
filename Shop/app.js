var elements1;


onload = (event) =>{   // wird aufgerufen sobald Webseite geladen wird
    elements1 = document.getElementsByClassName("elements");

}


function show(){
    
    console.log(elements1[0]);

    if(elements1[0].style.display == "none"){
        for(let x=0; x<=8; x++){
            elements1[x].style.display = "block-inline";
        } 
    }

    else{
        for(let x=0; x<=8; x++){
            elements1[x].style.display = "none";
        }
    }
        


    
}

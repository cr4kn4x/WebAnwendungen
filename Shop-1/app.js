
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}





var elements1 = document.getElementsByClassName("elements");;


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



function function_plus(){
    console.log(slider.value);
    
    slider.value++;
    output.innerHTML = slider.value;
}

function function_minus(){
    console.log(slider.value);
    
    slider.value--;
    output.innerHTML = slider.value;
}




function adjustLeftContainerHeight(){
       var height_shop_container;
        var shop_container = document.getElementById('shop_container');
        var left_container = document.getElementById('l_container');
        height_shop_container = shop_container.offsetHeight;
        left_container.style.height = height_shop_container;
    }
    
    
    adjustLeftContainerHeight();
    window.addEventListener("resize", adjustLeftContainerHeight);
    
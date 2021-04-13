
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




function adjustContainerHeight(){
		var height_shop_container;
		var height_left_container;
        var shop_container = document.getElementById('shop_container');
        var left_container = document.getElementById('l_container');
		
        height_shop_container = shop_container.offsetHeight;
		
		
		height_left_container = left_container.offsetHeight;
		
		console.log("1:")
		console.log(height_shop_container)
		
		console.log("2:")
		console.log(height_left_container)
		
		if(height_left_container > height_shop_container){
			console.log("TRUE");
			shop_container.style.height = height_left_container+4;
		}
		
		else{
			console.log("FALSE");
			left_container.style.height = height_shop_container;
		}
		
        
}
    
    
adjustContainerHeight();
window.addEventListener("resize", adjustContainerHeight);
    

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}





var category = document.getElementsByClassName("elements"); //Kategorie
var slider = document.getElementById("elements1"); //Slider
var rating = document.getElementById("elements2"); //Bewertungen


function show1(){
    
    

    for (let x=0; x<=category.length; x++){

       
        if(category[x].style.display == "none"){
            
            category[x].style.display = "block";
            
        }

        else{
            
            category[x].style.display = "none";
            
        }
    }
    

}


function show2(){
    
    
    

    for (let x=0; x<=slider.length; x++){
        
        if(slider[x].style.display == "block"){
            
            slider[x].style.display = "block";
            
        }

        else{
            
            slider[x].style.display = "none";
            
        }
    }
    

}



function show3(){
    
    

    for (let x=0; x<=rating.length; x++){
        
        if(rating[x].style.display == "none"){
            
            rating[x].style.display = "block";
            
        }

        else{
            
            rating[x].style.display = "none";
            
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
			shop_container.style.height = height_left_container+4;
		}
		
		else{
			left_container.style.height = height_shop_container;
		}
		
        
}
    
    
adjustContainerHeight();
window.addEventListener("resize", adjustContainerHeight);
    
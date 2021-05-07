
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}





 //Kategorie#





function show_cat(){
	var category_container = document.getElementById("cat");
	var category_symbol = document.getElementById("span_cat");
 
    if(category_container.style.display == "none"){
        category_container.style.display = "block";
		category_symbol.innerHTML="&minus;";
    }

    else{
        category_container.style.display = "none";
		category_symbol.innerHTML="&plus;";
    }
    
    

}


function show_price_slider(){
		var slider = document.getElementById("Price_box"); //Slider
		var slider_symbol = document.getElementById("span_price");
		
        if(slider.style.display == "none"){
            slider.style.display = "block";
			slider_symbol.innerHTML="&minus;";
        }

        else{
            slider.style.display = "none";
			slider_symbol.innerHTML="&plus;";
        }
    
}



function show_ratings(){
	var rating = document.getElementById("Rating_box"); //Bewertungen
	var rating_symbol = document.getElementById("span_rating");
	if(rating.style.display == "none"){
        rating.style.display = "block";
		rating_symbol.innerHTML="&minus;";
    }

    else{
        rating.style.display = "none";
		rating_symbol.innerHTML="&plus;";
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
		

		
		if(height_left_container > height_shop_container){
			shop_container.style.height = height_left_container+4;
		}
		
		else{
			left_container.style.height = height_shop_container;
		}
		
        
}
    
    
adjustContainerHeight();
window.addEventListener("resize", adjustContainerHeight);
 
 
show_ratings();
show_price_slider();

adjustContainerHeight();
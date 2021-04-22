  /*------ INIT ------- */
var mid_slide;
var left_slide;
var right_slide;
var slides;
var slider_images;

onload = (event) =>{   // wird aufgerufen sobald Webseite geladen wird
    slides = document.getElementsByClassName("mySlides");
    slider_images = document.getElementsByClassName("slider_img");

    mid_slide = 1;
	left_slide= 0;
	right_slide = 2;
    
    /* First show */
	showSlides(mid_slide);
	/* --------------------------------- */

}


function plusSlides(n) {
  showSlides(mid_slide+=n, left_slide+=n, right_slide+=n);
}


function showSlides(n0,n1,n2) {
  
	

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";       /* Alle Slides werden "deaktiviert" */
	}


	/*------------ n0 : mid_slide */
	if( n0 > slides.length-1 ){
		mid_slide=0;
	}
	else if( n0 < 0 ) {
		mid_slide=slides.length-1;
	}
  
	/*------------ n1 : left_slide */
	if( n1 > slides.length-1 ){
		left_slide=0;
	}
	else if( n1 < 0 ) {
		left_slide=slides.length-1;
	}
  
	/*------------ n2 : right_slide */
	if( n2 > slides.length-1 ){
		right_slide=0;
	}
	else if( n2 < 0 ) {
		right_slide=slides.length-1;
	}	

	
	slides[mid_slide].style.borderColor = "yellow";
	slides[left_slide].style.borderColor = "";
	slides[right_slide].style.borderColor = "";


	
	slides[left_slide].style.display = "inline-block";     /* left Slide wird eingeblendet. */
	slides[left_slide].style.left = "2%"; 
	
	slides[left_slide].style.width = "230px";
	slides[left_slide].style.height = "500px";
 
	slides[mid_slide].style.display = "inline-block";     /*  mid Slide wird eingeblendet. */
	slides[mid_slide].style.left = "28%"; 
	
	slides[mid_slide].style.width = "300px";
	slides[mid_slide].style.height = "600px";
	
	slides[right_slide].style.display = "inline-block";     /* right Slide wird eingeblendet. */
	slides[right_slide].style.left = "59%";
	
	slides[right_slide].style.width = "230px";
	slides[right_slide].style.height = "500px";
	
	
	
	
	

	
	
		
}

/*
setInterval("plusSlides(1)", 5000);
*/

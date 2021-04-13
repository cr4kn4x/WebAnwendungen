function adjustHeight(){
	var height_author_image;
	
	var author_image = document.getElementById('author_img');
	var bio_buble = document.getElementById('bio_bb');


	height_author_image = author_image.offsetHeight;
	console.log(height_author_image);
	
	var tmp = String(height_author_image) + "px";
	
	
	document.getElementById("bio_bb").style.minHeight = tmp;
}



adjustHeight();

window.addEventListener("resize", adjustHeight);


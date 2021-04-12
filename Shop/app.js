function adjustLeftContainerHeight(){
	var height_shop_container;
	var shop_container = document.getElementById('shop_container');
	var left_container = document.getElementById('l_container');
	height_shop_container = shop_container.offsetHeight;
	left_container.style.height = height_shop_container;
}



adjustLeftContainerHeight();

window.addEventListener("resize", adjustLeftContainerHeight);


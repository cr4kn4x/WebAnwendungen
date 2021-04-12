function adjustLeftContainerHeight(){
    var height_shop_container;
     var shop_container = document.getElementById('biographie_buble1');
     var left_container = document.getElementById('r_container');
     height_shop_container = shop_container.offsetHeight;
     left_container.style.height = height_shop_container;
 }
 
 
 adjustLeftContainerHeight();
 window.addEventListener("resize", adjustLeftContainerHeight);
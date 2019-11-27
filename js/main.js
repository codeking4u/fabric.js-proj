var canvas = new fabric.Canvas('c');
/* ctx = canvas.getContext("2d");
canvas.width = 903;
canvas.height = 657;


var background = new Image();
background.src = "img/img.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
} */
var imageUrl = "img/img2.jpg";

// Define 
canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
    // Optionally add an opacity lvl to the image
    backgroundImageOpacity: 1,
    // should the image be resized to fit the container?
    backgroundImageStretch: true
});
  
canvas.on('mouse:down', function(options) {
  console.log(options);
 if (options.target ==undefined ) {
 /* canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: options.e.offsetY-15, left: options.e.offsetX-15,stroke: 'red',
	strokeWidth: 3 }));
  

  canvas.item(0).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false
  });
  canvas.setActiveObject(canvas.item(0));*/
 
  //this.__canvases.push(canvas);
  
  
  var cic1 =new fabric.Circle({ radius: 30, fill: '#f55', top: options.e.offsetY-15, left: options.e.offsetX-15,stroke: 'red',
	strokeWidth: 3 });
  
  var text1 = new fabric.Text('25', {
	  fontSize: 30,
    textAlign: 'center',
        originX: 'center',
        originY: 'center',
        left: options.e.offsetX+15,
        top: options.e.offsetY+15
	});
  var group = new fabric.Group([ cic1,text1  ], {
	  left: options.e.offsetX-30,
	  top: options.e.offsetY-30,
	});
  canvas.add(group);
  canvas.item(canvas.getObjects().length-1).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false
  });
  canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
  }
  
  
});


/* $(window).bind("load", function(){
  var w = $(window).width();
  var h = $(window).height();

  $("#c").css("width", w + "px");
  $("#c").css("height","auto"); 
}); */
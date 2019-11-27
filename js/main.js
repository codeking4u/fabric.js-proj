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
  //console.log(options);
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
  
  var text1 = new fabric.IText('25', {
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
  }else{
    var grp = canvas.getActiveObject(); 
    grp.on('mousedown', fabricDblClick(grp, function (obj) {
    ungroup(grp);
    canvas.setActiveObject(grp._objects[1]);
    grp._objects[1].enterEditing();
    grp._objects[1].selectAll();
    //grp._objects[1].lockMovementX = true;
    //grp._objects[1].lockMovementY = true;

}));

grp._objects[1].on("editing:exited", () => {
  var items = [];
  grp._objects.forEach(function(obj) {
    items.push(obj);
    canvas.remove(obj);
  });
  const newTextGroup = new fabric.Group(items, {
    //subTargetCheck: true
    left: options.e.offsetX-30,
	  top: options.e.offsetY-30,
  });
  canvas.add(newTextGroup);
   /* newTextGroup.on(
    "mousedown",
    fabricDblClick(newTextGroup, obj => {
      ungroup(newTextGroup);
    })
  );  */
});

  }
  
  
});

var fabricDblClick = function (obj, handler) {
  return function () {
      if (obj.clicked) handler(obj);
      else {
          obj.clicked = true;
          setTimeout(function () {
              obj.clicked = false;
          }, 500);
      }
  };
};

var ungroup = function (group) {
  items = group._objects;
  //group._restoreObjectsState();
  canvas.remove(group);
  for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      //console.log(items[i]);
  }
  
  // if you have disabled render on addition
  canvas.renderAll();
};
/* $(window).bind("load", function(){
  var w = $(window).width();
  var h = $(window).height();

  $("#c").css("width", w + "px");
  $("#c").css("height","auto"); 
}); 

document.getElementById('clone').addEventListener('click',
function (e) {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        var clone = obj.clone();
        clone.set({
        top: clone.get('top') + 150
        });
        canvas.add(clone);
    });

*/
$('#delete_selected').click(function(){
  canvas.remove(canvas.getActiveObject());
});
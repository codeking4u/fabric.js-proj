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
/* var imageUrl = "img/img.png";

// Define 
 canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
    // Optionally add an opacity lvl to the image
    backgroundImageOpacity: 1,
    // should the image be resized to fit the container?
    backgroundImageStretch: true
}); 
   */
canvas.on('mouse:down', function(options) {
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
  var number=1;
  if(canvas.getObjects().length){
     number =canvas.getObjects().length+1;
  }
  
  var text1 = new fabric.IText(number.toString(), {
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
    console.log(canvas.getActiveObject().get('type'));
    if(canvas.getActiveObject().get('type')=="group"){
    grp.on('mousedown', fabricDblClick(grp, function (obj) {
      ungroup(grp);
      canvas.setActiveObject(grp._objects[1]);
      grp._objects[1].enterEditing();
      grp._objects[1].selectAll();
      grp._objects[1].lockMovementX = true;
      grp._objects[1].lockMovementY = true;
  }));
  }

  var left_val =grp.left;
var top_val = grp.top;
grp._objects[1].on("editing:exited", () => {
  var items = [];
  grp._objects.forEach(function(obj) {
    items.push(obj);
    canvas.remove(obj);
  });
  const newTextGroup = new fabric.Group(items, {
    //subTargetCheck: true
    left: left_val,
	  top: top_val,
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
  canvas.renderAll();
});

$('#save_can').on('click',function(){
  var json = canvas.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling']);
  save_can(json,0)
});
$('#save_can2').on('click',function(){
  var json = canvas.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling']);
  save_can(json,1);
});
$('.previous').on('click',function(e){
  e.preventDefault();
  if ('referrer' in document) {
    window.location = document.referrer;
  } else {
      window.history.back();
  }
});

function save_can(json,type){
  var json_data = JSON.stringify(json);
  var id= $('.datajson.active').attr('data-id');
  $.ajax({ 
      type      : 'POST',
      url       : 'function.php?action=save_can',
      data      : {myData:json_data,id:id},
      success   : function(res) {
          //var result = $.parseJSON(res);
          load_can();	
          alert('Saved !');
          if(type==1){
            $('.previous').trigger('click');
          }
      }
  });
  
}

function load_can(){
  var id= $('.datajson.active').attr('data-id');
  $.ajax({ 
      type      : 'POST',
      url       : 'function.php?action=get_can',
      success   : function(res) {
          //var result = $.parseJSON(res);	
          $('.listing').html(res);
      }
  });
}
$(document).on('click','.datajson',function(e){
  $('.datajson').removeClass('active');
  $(this).addClass('active');
  var json= $(this).attr('data-json');
  var id= $(this).attr('data-id');
  
  canvas.loadFromJSON(json, function() {
    canvas.renderAll.bind(canvas) 
 },function(o,object){
  canvas.renderAll();
 })
 //canvas.deactivateAll();
//canvas.selection = false;
//canvas.deactivateAll();
  
  // Enable selection all objects
  var objects = canvas.getObjects(); 
  for (var i = 0; i < objects.length; i++) { console.log(canvas.item[i]);
    canvas.item[i]['selectable']  = false;
    canvas.item[i]['evented']  = false;
    canvas.item[i]['hasControls']  = false;
  }
  
  canvas.renderAll();
});
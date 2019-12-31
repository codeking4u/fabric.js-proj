window.canvas = new fabric.Canvas('c',{cursor:'cross-hair'});
canvas.selection = false;
window.readToDrop = false;
window.fillColor = '#fff';
window.fullwidth = $('main.main').width();
window.fullheight = $('main.main').height();
window.max_w_pos = fullwidth - 50;

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
 
  canvas.on('mouse:move', function (evt) {
    if (window.readToDrop==true) {
      canvas.defaultCursor = 'crosshair';
    }
  });
canvas.on('mouse:down', function(options) {
 if (options.target._element.tagName =='IMG' && window.readToDrop==true) {
  
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
  
  
  var cic1 =new fabric.Circle({ radius: 20, fill: window.fillColor, top: options.e.offsetY-10, left: options.e.offsetX-10,stroke: 'red',
  strokeWidth: 3 });
  var number=1;
  if(canvas.getObjects().length){
     number =canvas.getObjects().length+1;
  }
  
  var text1 = new fabric.IText(number.toString(), {
	  fontSize: 20,
    textAlign: 'center',
        originX: 'center',
        originY: 'center',
        left: options.e.offsetX+10,
        top: options.e.offsetY+10
	});
  var group = new fabric.Group([ cic1,text1  ], {
	  left: options.e.offsetX-20,
	  top: options.e.offsetY-20,
  });
  $('#number').val(number.toString());
  canvas.add(group);
  canvas.item(canvas.getObjects().length-1).set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false
  });
  canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
  window.readToDrop = false;
  canvas.defaultCursor = 'default';
  }else{ 
    if (options.target !=undefined && options.target.selectable!= false){
      var grp = canvas.getActiveObject(); 
      if(canvas.getActiveObject().get('type')=="group"){
        getText(grp);
      }
    }
    
  }
  
  
});

var fabricDblClick = function (obj, handler) {
  return function () {
      if (obj.clicked) handler(obj);
      else {
          obj.clicked = true;
          setTimeout(function () {
              obj.clicked = false;
          }, 4000);
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


$('#delete_selected').click(function(e){
  canvas.remove(canvas.getActiveObject());
  canvas.renderAll();
  e.preventDefault();
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
function getText(group){
  var items = group._objects;
  //group._restoreObjectsState();
  for (var i = 0; i < items.length; i++) {
      if(items[i].get('type')=='i-text'){
        $('#number').val((items[i].text));
      }
  }
}
$('#number').on('keyup',function(){
  //upper-canvas 
  //var canvas = new fabric.Canvas('c');
  var grp = canvas.getActiveObject(); 
  var items = grp._objects; 
  items[1].set({
    text: $('#number').val()
  });
  grp.addWithUpdate();
  canvas.renderAll();

  
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
  var dataurl= $(this).attr('data-url');

///////////////
    if (typeof json !== typeof undefined && json !== false) {
    console.log('jsonnn');
    canvas.clear();
    
    canvas.loadFromJSON(json, function() {
        canvas.renderAll.bind(canvas) 
    },function(o,object){
      canvas.renderAll();
    })

      var objects = canvas.getObjects();
      console.log(canvas); 
      for (var i = 0; i < objects.length; i++) { console.log(canvas);
        canvas.item(i).set({
          borderColor: 'red',
          cornerColor: 'green',
          cornerSize: 6,
          transparentCorners: false
        });

      }
      
    }else{
    
      if (typeof dataurl !== typeof undefined && dataurl !== false) {
        addImage(dataurl);
        /* setTimeout(
          function(){
              var jsonn = canvas.toJSON();
              console.log('normal',jsonn);
              $(this).attr('data-json',JSON.stringify(jsonn));
              $(this).attr('data-ab',1);
          }.bind(this),
          4000
        ); */
      }
     
     }
////////////////

  
  canvas.renderAll();
});

$(document).ready(function(){

  $('li.nav-item span' ).click( function() {
    $(this).parent().toggleClass('open');
    
  });
  $('header').css({'margin-left':parseInt($('aside').width())+5,'width': $(window).width()-parseInt($('aside').width())-5});

  $('.drop-ready').click(function(){
    $('.drop-ready').removeClass('active');
    $(this).addClass('active');
    window.readToDrop = true;
    window.fillColor = $(this).attr('data-color');
  });
  $('.red').click(function(){
    console.log('red');
    zoomIn()
  });
  $('.green').click(function(){
    console.log('red');
    zoomOut()
  });
})
function zoomIn() {
  canvasScale=1;
  SCALE_FACTOR=1.2;
  canvasScale = canvasScale * SCALE_FACTOR;

  canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
  canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);

  var objects = canvas.getObjects();
  for (var i in objects) {
      var scaleX = objects[i].scaleX;
      var scaleY = objects[i].scaleY;
      var left = objects[i].left;
      var top = objects[i].top;

      var tempScaleX = scaleX * SCALE_FACTOR;
      var tempScaleY = scaleY * SCALE_FACTOR;
      var tempLeft = left * SCALE_FACTOR;
      var tempTop = top * SCALE_FACTOR;

      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;

      objects[i].setCoords();
  }

 
  canvas.renderAll();
}
function zoomOut (){
  canvasScale=1;
  SCALE_FACTOR=1.2;
  canvasScale = canvasScale / SCALE_FACTOR;

  canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
  canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));

  var objects = canvas.getObjects();
  for (var i in objects) {
      var scaleX = objects[i].scaleX;
      var scaleY = objects[i].scaleY;
      var left = objects[i].left;
      var top = objects[i].top;

      var tempScaleX = scaleX * (1 / SCALE_FACTOR);
      var tempScaleY = scaleY * (1 / SCALE_FACTOR);
      var tempLeft = left * (1 / SCALE_FACTOR);
      var tempTop = top * (1 / SCALE_FACTOR);

      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;

      objects[i].setCoords();
  }
        
  canvas.renderAll();
}
function addImage(url){
  fabric.Image.fromURL(url, function(myImg) {
   var final_width = myImg.width;
   var final_height = myImg.height;
   var imageRatio = myImg.width/myImg.height;
   
   if(myImg.width>window.fullwidth){
   	final_width = max_w_pos
    final_height = final_width/ imageRatio;
    console.log(final_width,final_height)
   }else{
   
   }
   var myImg = myImg.set({ left: 0, top: 0 ,width:final_width,height:final_height,selectable: false});
   myImg.hoverCursor = 'default';
   console.log('img.width'+myImg.width,'can.width'+canvas.width);
   canvas.add(myImg); 
   
   canvas.setDimensions({width:final_width, height:final_height});
   
  });
}





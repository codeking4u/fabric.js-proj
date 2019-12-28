window.canvas = new fabric.Canvas('c',{cursor:'cross-hair'});
window.readToDrop = false;
window.fillColor = '#fff';

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
 if (options.target ==undefined && window.readToDrop==true) {
  
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
    if (options.target !=undefined){
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
  
  canvas.loadFromJSON(json, function() {
    canvas.renderAll.bind(canvas) 
 },function(o,object){
  canvas.renderAll();
 })
 setInterval(
   function(){},1000
 );
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
})


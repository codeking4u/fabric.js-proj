window.canvas = new fabric.Canvas('c',{cursor:'cross-hair'});
canvas.selection = false;
window.readToDrop = false;
window.fillColor = '#fff';
window.fullwidth = parseFloat($('main.main').width());
window.fullheight = $('main.main').height();
window.max_w_pos = fullwidth - 50;
fabric.Object.NUM_FRACTION_DIGITS = 17;
var SCALE_FACTOR = 1.3;
var zoomMax = 23; 
window.originalWidth = 600;
window.originalHeight = 400;
canvas.setZoom(1);

canvas.on('mouse:move', function (evt) {
  if (window.readToDrop==true) {
    canvas.defaultCursor = 'crosshair';
  }
});
canvas.on('mouse:down', function(options) {
  a = options.e.offsetX/canvas.getZoom();
  b = options.e.offsetY/canvas.getZoom();
 if (options.target.type =='image' && window.readToDrop==true) {
  var tempZoom = canvas.getZoom();
  canvas.setZoom(1);
  $('header').slideDown();
  var cic1 =new fabric.Circle({ radius: 20, fill: window.fillColor, top: b-10, left: a-10,stroke: 'black',
  strokeWidth: 3 });

  var number=1;
  if(canvas.getObjects().length){
     number =canvas.getObjects().length;
  }
  if($('#planning').hasClass('active')){
    number = ($('#planseries').val()) ? $('#planseries').val() : number;
    addNewNumber(number,'plan_series');
    $('.alpha').val('P');
  }else{
    number = ($('#hazmatseries').val()) ? $('#hazmatseries').val() : number;
    addNewNumber(number,'hazmat_series');
    $('.alpha').val('H');
  }
  var insideValue = $('.alpha').val()+number;
  var text1 = new fabric.IText(insideValue.toString(), {
	  fontSize: 15,
    textAlign: 'center',
        originX: 'center',
        originY: 'center',
        left: a+12,
        top: b+12
	});
  var group = new fabric.Group([ cic1,text1  ], {
	  left: a-20,
	  top: b-20,
  });
  $('#number').val(number.toString());
  canvas.add(group);
  canvas.setZoom(tempZoom);
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
        $('header').slideDown();
        getText(grp);
      }
    }else{
      $('.insideContent').val('');
      return false;
    }
  } 
});

$('#delete_selected').click(function(e){
  canvas.remove(canvas.getActiveObject());
  canvas.renderAll();
  e.preventDefault();
});

$('#save_can').on('click',function(){
  resetZoom();
  var json = canvas.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling','propertiesToInclude','width', 'height']);
  save_can(json,0)
});
$('#save_can2').on('click',function(){
  resetZoom();
  var json = canvas.toJSON(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling','propertiesToInclude','width', 'height']);
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
        $('#alpha , #number').val('');
        var s = items[i].text;
        if (/^[a-zA-Z]/.test(s)) {
          var splits = [s.slice(0,1), s.slice(1)];
          $('#alpha').val(splits[0]);
          $('#number').val(splits[1]);

        }else{
          $('#number').val(s);
          console.log('Contains only number');
        }
        
      }
  }
}
$('.insideContent').on('keyup',function(){
  //upper-canvas 
  var grp = canvas.getActiveObject(); 
  if(grp){
    var items = grp._objects; 
    items[1].set({
      text: ($('.alpha').val().toUpperCase()+$('#number').val())
    });
    grp.addWithUpdate();
    canvas.renderAll();
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
function addNewNumber(number,type){
  $.ajax({ 
      type      : 'POST',
      url       : 'function.php?action=addNewNumber',
      data      : {number : number , type : type},
      success   : function(res) {
        	
          if(type == 'plan_series'){
            $('#planseries').val(parseInt(res)+1);
          }	
          if(type == 'hazmat_series'){
            $('#hazmatseries').val(parseInt(res)+1);
          }
          
      }
  });
}
function getMaxSeries(type){
  $.ajax({ 
      type      : 'POST',
      url       : 'function.php?action=getMaxSeries',
      data      : {table : type},
      success   : function(res) {
          //var result = $.parseJSON(res);
          if(type == 'plan_series'){
            $('#planseries').val(parseInt(res)+1);
          }	
          if(type == 'hazmat_series'){
            $('#hazmatseries').val(parseInt(res)+1);
          }
      }
  });
}
$(document).on('click','.datajson',function(e){
  canvas.setZoom(1);
  $('.datajson').removeClass('active');
  $(this).addClass('active');
  var json= $(this).attr('data-json');
  var id= $(this).attr('data-id');
  var dataurl= $(this).attr('data-url');
    if (typeof json !== typeof undefined && json !== false && json!="" && typeof JSON.parse(json)  == 'object') {
    canvas.clear();
    console.log('json');
    canvas.loadFromJSON(json, function() {
        canvas.renderAll.bind(canvas) 
    },function(o,object){
      if (object.type == 'image') {
        object.set({ left: 0, top: 0,selectable: false});
        object.hoverCursor = 'default';
      }else{
        object.set({
          borderColor: 'red',
          cornerColor: 'green',
          cornerSize: 6,
          transparentCorners: false
        });
      }
      canvas.setHeight(object.height);
      canvas.setWidth(object.width);
      $('.canvas-container canvas').attr('data-originalWidth',object.width);
      $('.canvas-container canvas').attr('data-originalHeight',object.height);
      canvas.renderAll();
    })
    }else{
        
        canvas.clear();
        if (typeof dataurl !== typeof undefined && dataurl !== false) {
          addImage(dataurl);
        }
      
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
  $('.zoom').click(function(){
    zoomIn()
  });
  $('.zoom-init').click(function(){
    resetZoom()
  });
  $('.zoom-out').click(function(){
    zoomOut();
  
  });

  $('.colordiv').click(function(){
    var grp = canvas.getActiveObject();
    var color = $(this).attr('data-color'); 
    if(grp){
      var items = grp._objects; 
      items[0].set({
        fill: color
      });
      grp.addWithUpdate();
      canvas.renderAll();
    }
    
  });
})


 function zoomIn2() {
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
function zoomOut2 (){
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
  console.log(url);
  fabric.Image.fromURL(url, function(myImg) {
   var final_width = myImg.width;
   var final_height = myImg.height;
   var imageRatio = myImg.width/myImg.height;
   console.log(final_width,final_height,'first',imageRatio)
   if(myImg.width>window.fullwidth){
   	//final_width = max_w_pos
    final_height = final_width/ imageRatio;
    console.log(final_width,final_height)
   }else{
   
   }
   
   
    canvas.setDimensions({width:final_width, height:final_height});
    $('.canvas-container canvas').attr('data-originalWidth',final_width);
    $('.canvas-container canvas').attr('data-originalHeight',final_height);

    var myImg = myImg.set({ left: 0, top: 0 ,width:final_width,height:final_height,selectable: false});
   myImg.hoverCursor = 'default';
   console.log('img.width'+myImg.width,'can.width'+canvas.width);
   canvas.add(myImg); 
  });
}
function resetZoom() {

  canvas.setHeight(canvas.getHeight() /canvas.getZoom() );
  canvas.setWidth(canvas.getWidth() / canvas.getZoom() );
  console.log(canvas.getZoom());
  canvas.setZoom(1);

  canvas.renderAll();

  getFabricCanvases().forEach(function(item){
      item.css('left', 0);
      item.css('top', 0);
  });

}
var getFabricCanvases = (function () {
  var fabricCanvasCollection;
  return function getCanvases() {
      if (!fabricCanvasCollection) {
          fabricCanvasCollection = [];
          var fabricCanvas = $('.canvas-container canvas');
          fabricCanvas.each(function(index, item) {
              fabricCanvasCollection.push($(item));
          });
      }
      return fabricCanvasCollection;
  }
})();

function zoomInCalcYpos(yPos) {
  yPos *= canvas.getZoom();
  var height = parseFloat($('.canvas-container canvas').attr('data-originalHeight'));
  return zoomCalcYpos( (height/2) - yPos );
}
function zoomCalcYpos(yPos) {
  var height = parseFloat($('.canvas-container canvas').attr('data-originalHeight'));
  if (yPos>0){
      return 0;
  }
  if (yPos+canvas.getHeight() < height) {
      return height - canvas.getHeight();
  }
  return yPos;
}
function zoomInCalcXpos(xPos) {
  
  var width = parseFloat($('.canvas-container canvas').attr('data-originalWidth'));
  xPos *= canvas.getZoom();
  return zoomCalcXpos((width/2) - xPos);
}
function zoomCalcXpos(xPos) {
  var width = parseFloat($('.canvas-container canvas').attr('data-originalWidth'));
  if (xPos>0){
      return 0;
  }
  if (xPos+canvas.getWidth() < width){
    $('.canvas-container canvas').attr('data-originalWidth',final_width);
      $('.canvas-container canvas').attr('data-originalHeight',final_height);
      return width - canvas.getWidth();
  }
  return xPos;
}
// Zoom In
function zoomIn() {
  if(canvas.getZoom().toFixed(5) > zoomMax){
      console.log("zoomIn: Error: cannot zoom-in anymore");
      return;
  }

  canvas.setZoom(canvas.getZoom()*SCALE_FACTOR);
  canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
  canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
  canvas.renderAll();
}

// Zoom Out
function zoomOut() {
  if( canvas.getZoom().toFixed(5) <=0.5 ){
      console.log("zoomOut: Error: cannot zoom-out anymore");
      return;
  }

  canvas.setZoom(canvas.getZoom()/SCALE_FACTOR);
  canvas.setHeight(canvas.getHeight() / SCALE_FACTOR);
  canvas.setWidth(canvas.getWidth() / SCALE_FACTOR);
  canvas.renderAll();
}





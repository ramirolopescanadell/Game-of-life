var canvasSize = 500;
var fieldSize = 25;
var cantFields = canvasSize / fieldSize;
var started = false;
const celsSize = 15;
var button,cels;

function initializeCels(){
  var cels = new Array(canvasSize / fieldSize);
  for (var i = 0; i < cels.length; i++) {
    cels[i] = new Array(canvasSize /fieldSize);
    for (var j = 0; j < cels.length; j++) {
      cels[i][j] = false;
    }
  }
  return cels
}

function setup() {
  var canvas = createCanvas(canvasSize, canvasSize);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x,y);
  button = createButton('Start');
  button.position(canvasSize*2, canvasSize/2);
  button.addClass('btn btn-primary');
  button.mousePressed(start);
  translate(canvasSize, canvasSize)
  cels = initializeCels();
}

function draw() {
  background(220);

  for(var i = 0; i <= canvasSize; i += fieldSize){
    line(i,0,i,canvasSize);
    line(canvasSize,i,0,i);
  }

  var auxCels = initializeCels();

  for(var i = 0; i < cels.length; i++){
    for(var j = 0; j < cels.length; j++){
      if(cels[i][j] == true){
        fill('BLUE');
        circle((i*fieldSize) + (fieldSize/2),(j*fieldSize) + (fieldSize/2), celsSize);
      }
      if (started){
        auxCels[i][j] = checkCel(i,j);
      }
    }
  }
  if(started){
    frameRate(3);
    for(var i = 0; i < cels.length; i++){
      for(var j = 0; j < cels.length; j++){
        cels[i][j] = auxCels[i][j];
      }
    }
  }else{
    frameRate(30);
  }
}

function checkCel(x,y){
  var posX,posY;
  var cant = 0;
  var live = false;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if((i == 0) && (j == 0)){
        live = cels[x][y];
      }else{  
        posX = x + i;
        posY = y + j;
        if((cels[posX]) && (cels[posX][posY]) == true){
          cant++;
        }
      }
    }
  }
  if ((live) && ((cant == 2) || (cant == 3))){
    return true
  }else{
    return (cant == 3)
  }
}

function start(){
  started = true;
  button = createButton('Stop');
  button.position(canvasSize*2, canvasSize/2);
  button.addClass('btn btn-danger');
  button.mousePressed(stop);
}

function stop(){
  started = false;
  button = createButton('Start');
  button.position(canvasSize*2, canvasSize/2);
  button.addClass('btn btn-primary');
  button.mousePressed(start);
}

function mousePressed(){
  if((!started) && (0 <= mouseX) &&(canvasSize >= mouseX)&& (0 <= mouseY)&&(canvasSize >= mouseY)){
    var x = parseInt(mouseX / fieldSize);
    var y = parseInt(mouseY / fieldSize);
    cels[x][y] = !cels[x][y];
  }
}
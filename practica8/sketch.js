var lienzo;
var tamVec = 8;
var coloresBase = new p5.Vector([tamVec]);
var botonesBase = new p5.Vector([tamVec]);
var botonesHerramientas = new p5.Vector([3]);
var colorPincel;
var tamañoPincel = 20;
var botonNuevo;
var puntoViejo = new p5.Vector([2]);
var puntoNuevo = new p5.Vector([2]);
var estado = 0;
let slider;
var imgGoma, imgPincel, imgLapiz;
function preload(){
  imgGoma = loadImage("goma.png");
  imgPincel = loadImage("pincel.png");
  imgLapiz = loadImage("lapiz.png");
}

function setup() {
  createCanvas(windowHeight,windowWidth);
  
  //creamos la zona del lienzo
  lienzo = createGraphics(width,700);
  lienzo.background(255);
  lienzo.smooth();
  lienzo.noStroke();

  
  //Colores
  colorPincel = color(0);
  lienzo.fill(colorPincel);
  lienzo.stroke(colorPincel);
  
  //iconos
  imgGoma.resize(40,40);
  imgPincel.resize(35,35);
  imgLapiz.resize(35,35);
  
  coloresBase[0] = color(255,0,0);
  coloresBase[1] = color(255,51,0);
  coloresBase[2] = color(255,102,153);
  coloresBase[3] = color(204,51,255);
  coloresBase[4] = color(102,255,255);
  coloresBase[5] = color(0,153,255);
  coloresBase[6] = color(0, 204, 0);
  coloresBase[7] = color(0,0,255);
  
  //Creamos botones de colores
  for(let i = 0; i<tamVec; i++){
    botonesBase[i] = new Clickable();
    botonesBase[i].strokeWeight = 0;
    botonesBase[i].text = "";
    botonesBase[i].color = coloresBase[i];
    botonesBase[i].cornerRadius = 0;
    botonesBase[i].resize(20,20);
    botonesBase[i].locate(700+((i*20)+(5*i)),45);
    
    botonesBase[i].onHover = function(){
      botonesBase[i].strokeWeight = 2;
    }
    
    botonesBase[i].onOutside = function(){
      botonesBase[i].strokeWeight = 0;
    }

    botonesBase[i].onPress = function(){
      colorPincel = botonesBase[i].color;
    }
  }
  
  //Creamos boton de lienzo nuevo
  botonNuevo = new Clickable();
  botonNuevo.text = "Nuevo Lienzo";
  botonNuevo.color = color(255);
  botonNuevo.cornerRadius = 0;
  botonNuevo.resize(25,25);
  botonNuevo.locate(50,40);
  botonNuevo.onHover = function(){
      botonNuevo.strokeWeight = 2;
    }
    
  botonNuevo.onOutside = function(){
      botonNuevo.strokeWeight = 0;
    }

  botonNuevo.onPress = function(){
    lienzo.background(255);
  }
  
  //Barra Tamaño Pincel
  slider = createSlider(5,100,20,5);
  slider.position(150,40);
  slider.style('width','250px');
  
  //Botones opciones
  for(let i = 0; i<3; i++){
    botonesHerramientas[i] = new Clickable();
    botonesHerramientas[i].strokeWeight = 0;
    botonesHerramientas[i].text = "";
    botonesHerramientas[i].color = 230;
    botonesHerramientas[i].cornerRadius = 0;
    botonesHerramientas[i].resize(40,40);
    botonesHerramientas[i].locate(450+(i*50)+5,35);
    
    botonesHerramientas[i].onHover = function(){
      botonesHerramientas[i].color = color(255, 255, 0);

    }
    
    botonesHerramientas[i].onOutside = function(){
      botonesHerramientas[i].color = 230;
    }

    botonesHerramientas[i].onPress = function(){
      estado = i;
    }
  }
}

function draw() {
  background(230);
  //Lienzo
  image(lienzo,0,100);
  //Botones herramientas
  for(let i = 0; i<3; i++){
    botonesHerramientas[i].draw(); 
  }
  
  //Iconos
  image(imgGoma,450,35);
  image(imgPincel,510,35);
  image(imgLapiz,560,35);
  
  //cambiamos tamaño del pincel
  tamañoPincel = slider.value();
  //Herramienta
  switch(estado){
    case 0:
      if(mouseY>100){
        stroke(0)
        strokeWeight(2);
        fill(255);
        square(mouseX-tamañoPincel/2,mouseY-tamañoPincel/2,tamañoPincel);
      }  
      break;
    case 1:
      if(mouseY>100){
        strokeWeight(2);
        fill(colorPincel);
        circle(mouseX,mouseY,tamañoPincel);
      }  
      break;
    case 2:
      fill(colorPincel);
      circle(mouseX,mouseY,2);
      break;
  }
  
  //Dibujamos los botones
  for(let i = 0; i<tamVec; i++){
    botonesBase[i].draw();
  }
  botonNuevo.draw();
}

function mouseDragged(){
  if(mouseY>100){
    if(estado == 0){
      lienzo.fill(255);
      lienzo.noStroke();
      lienzo.square(mouseX-tamañoPincel/2,(mouseY-100)-tamañoPincel/2,tamañoPincel);
    }else if(estado == 1 ){
      lienzo.fill(colorPincel);
      lienzo.stroke(colorPincel);
      lienzo.circle(mouseX,mouseY-100,tamañoPincel);
    }else if(estado == 2){
      lienzo.fill(colorPincel);
      lienzo.stroke(colorPincel);
      puntoNuevo[0] = mouseX;
      puntoNuevo[1] = mouseY-100;

      if (puntoViejo[0] != null){
        lienzo.line(puntoViejo[0],puntoViejo[1],puntoNuevo[0],puntoNuevo[1]);
      }

      puntoViejo[0] = puntoNuevo[0];
      puntoViejo[1] = puntoNuevo[1];
    }
  }
}

function mouseReleased(){
  if(mouseY>100){
    puntoViejo[0] = null;
  }
}
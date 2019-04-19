console.log("Loaded");
console.log("------");

var canvas_size = new Size(1100, 800);
//var tile_size = new Size();
var dimension = new Vector(10, 5);

var canvas = document.getElementById('canvas');
//var level = new Level(canvas, canvas_size, tile_size);
var myCanvas = new Canvas(canvas, canvas_size);

//myCanvas.addView(new View(myCanvas, new Rectangle(new Vector(350,350), new Size(50,50))));
//myCanvas.addView(new LevelView(myCanvas, new Rectangle(new Vector(350,350), new Size(50,50))), level);
myCanvas.addView(new LevelView(myCanvas, new Rectangle(new Vector(350,350), new Size(400,200)), dimension));

//console.log(level);
//level.console_recap();
//level.consoleGrille();



window.onload = function(){
    console.log("Init mouse handling.");
    canvas.onmousemove = myCanvas.handleMouseMove.bind(myCanvas);
};


// Moteur de rendu
var moteur = setInterval(() => {

    //myCanvas.draw.bind(myCanvas);
    myCanvas.draw();

}, 25);








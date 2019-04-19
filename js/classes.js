class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
class Rectangle {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
}

class Tile {

    constructor(type, pos, size, pos_grille) {
        this.type = type;
        this.pos = pos;
        this.size = size;
        this.pos_grille = pos_grille;
    }

    console_recap() {
        console.log("---------");
        console.log("Class Dalle type : "+ this.type);
        console.log("Position : ["+this.pos.x+","+this.pos.y+"]");
        console.log("Position : ["+this.pos_grille.x+","+this.pos_grille.y+"]");
    }

}

class Level {

    grille = Array();

    constructor(frame, canvas_size, dimension) {
        this.frame = frame;
        this.dimension = dimension;
        this.canvas_size = canvas_size;
        this.ratio = [this.frame.size.width / this.canvas_size.width, this.frame.size.height / this.canvas_size.height];
        this.tile_size = new Size(Math.round((this.frame.size.width / this.dimension.x)), Math.round( (this.frame.size.height / this.dimension.y)));
        //this.tile_size = tile_size;
        this.tile_active = null;
        this.old_tile_active = null;
        this.grille = this.initGrille();
        this.consoleGrille();
        this.img = null;
        this.console_this();
        
    }

    setImage(img) {
        this.img = img;
    }

    initGrille() {
        let grille = Array();
        console.log()
        for (let i=0; i < this.dimension.x; i++) {
            grille.push(new Array());
            for (let j=0; j < this.dimension.y; j++) {
                let str = "";
                if (this.getRandomInt(3) == 0) {
                    str = "dalle";
                }
                grille[i].push(new Tile(str, new Vector(i*this.tile_size.width, j*this.tile_size.height), this.tile_size, new Vector(i, j)));
            }
        }
        return grille;
    }
    

    draw_level(ctx) {

        //console.log("redraw !");
        ctx.clearRect(this.frame.pos.x, this.frame.pos.y, this.frame.size.width, this.frame.size.height);
        
        this.draw_grille(ctx);
        
        this.grille.forEach(cols => {
            cols.forEach(tile => {
                
                if (tile.type == "dalle") {
                    ctx.fillStyle = "rgba(255,80,80,1)";
                } else {
                    ctx.fillStyle = "rgba(255,255,255,1)";
                }
                ctx.fillRect(this.frame.pos.x + tile.pos.x+1, this.frame.pos.y + tile.pos.y+1, tile.size.width-2, tile.size.height-2);
                //console.log((this.frame.pos.x + tile.pos.x+1)+", "+(this.frame.pos.y + tile.pos.y+1)+", "+(tile.size.width-2)+", "+(tile.size.height-2));
                

                //console.log(this.tile_active);
                //console.log(tile);

                if ((this.tile_active != null) && (this.tile_active == tile)) {
                    //console.log('ICI');
                    ctx.fillStyle = "rgba(169,164,40,0.8)";
                    ctx.fillRect(this.frame.pos.x + tile.pos.x+1, this.frame.pos.y + tile.pos.y+1, tile.size.width - 2, tile.size.height - 2);
                } 
               
            });
        });


        
           
    }

    handleMouseMove(mousePos) {
        let colNbr = Math.floor(mousePos.x / this.tile_size.width) + 1;
        let lineNbr = Math.floor(mousePos.y / this.tile_size.height) + 1;
        //console.log("Grille pos : "+colNbr+", "+lineNbr);
        this.tile_active = this.grille[colNbr-1][lineNbr-1];
        //console.log(this.tile_active);
        //console.log(this.grille);
    }

    draw_grille(context) {
        //console.log(this.size.width+", "+this.size.height);
        let x = 0; let y = 0;
        context.strokeStyle='#818181';
        
        while (x*this.tile_size.width <= this.frame.size.width) {
            context.beginPath();
            context.moveTo(this.frame.pos.x + x*this.tile_size.width, this.frame.pos.y);
            context.lineTo(this.frame.pos.x + x*this.tile_size.width, this.frame.pos.y + this.frame.size.height);
            context.stroke();
            x++;
        }
        while (y*this.tile_size.height <= this.frame.size.height) {
            context.beginPath();
            context.moveTo(this.frame.pos.x, this.frame.pos.y + y*this.tile_size.height);
            context.lineTo(this.frame.pos.x + this.frame.size.width, this.frame.pos.y + y*this.tile_size.height);
            context.stroke();
            y++;
        }
    }

    // todo
    draw_overlay(context, x, y) {

    }

    // console
    consoleGrille() {
        console.log("Grille cols : "+this.grille.length+", lines : "+this.grille.height);
        this.grille.forEach(element => {
            let str = "";
            element.forEach(tile => {
                str += tile.pos.x+" ,"+tile.pos.y+',';
            });
            console.log(str);
        });
    }
    console_recap() {
        this.tiles.forEach(tile => {
            tile.console_recap();
        });
    }
    console_this() {
        console.log("frame :");
        console.log(this.frame);
        console.log("ratio :");
        console.log(this.ratio);
        console.log("tile_size :");
        console.log(this.tile_size);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

}

class View {
    constructor(canvas, frame) {

        this.canvas = canvas;
        this.frame = frame;

    }
}

class LevelView extends View {
    constructor(canvas, frame, dimension) {
        super(canvas, frame);
        this.dimension = dimension;
        this.level = new Level(this.frame, this.canvas.size, dimension);
    }
    draw(context) {
        context.clearRect(this.frame.pos.x, this.frame.pos.y, this.frame.size.width, this.frame.size.height);
        this.level.draw_level(context);
        /* context.fillStyle = "rgba(169,164,40,0.8)";
        context.fillRect(this.frame.pos.x, this.frame.pos.y, this.frame.size.width, this.frame.size.height); */
        //console.log(this.frame);
        //console.log((this.frame.pos.x+1)+', '+(this.frame.pos.y+1)+', '+(this.frame.size.width-2)+', '+(this.frame.size.height-2));
        //console.log(this.frame.size.width);
        //console.log(this.frame.pos.x);
    }
}


class Mouse {

    constructor() {
        
        this.mousePos = new Vector(0,0);

    }
    setMousePos(x,y) {

        this.mousePos.x = x;
        this.mousePos.y = y;
        
    }
}

class Canvas {  

    constructor(canvas, size) {
        this.canvas = canvas;
        this.size = size;
        this.context = canvas.getContext('2d');
        //canvas.onmousemove = this.handleMouseMove.bind(this);
        this.views = Array();
        this.initDrawing = false;

        this.imageLoaded = false;
        this.img = new Image(296, 304);
        this.img.src = "svg/spirale.svg";
        this.img.onload = function(e) {
            console.log("image loaded");
            this.imageLoaded = true;
        };

        this.mouse = new Mouse();
    }
    draw() {

        if (!this.initDrawing) {
            console.log("initDrawing");
            this.context.clearRect(0, 0, this.size.width, this.size.height);
            this.context.fillStyle = "rgba(255,255,40,1.0)";
            this.context.fillRect(0, 0, this.size.width, this.size.height);
            this.initDrawing = true;
        }
        if (!this.imageLoaded) {
            this.context.drawImage(this.img, 0, 0, 296, 304);
            this.imageLoaded = true;
        }

        //this.context.clearRect(0, 0, this.size.width, this.size.height);
        
        this.views.forEach(view => {
            view.draw(this.context);
        });

        //this.level.draw_level(this.context);
        /* this.context.clearRect(0, 0, this.size.width, this.size.height);
        console.log(this.size.width);
        this.views.forEach(view => {
            view.draw();
        }); */
    }
    addView(view) {
        this.views.push(view);
    }

    handleMouseMove(e) {
        
        //console.log("onmousemove");

        this.views.forEach(view => {
            if ( (e.clientX >= view.frame.pos.x) && (e.clientX <= view.frame.pos.x + view.frame.size.width)
                && (e.clientY >= view.frame.pos.y) && (e.clientY <= view.frame.pos.y + view.frame.size.height)) {
                    //console.log(e.clientX+","+e.clientY+" | "+ (e.clientX - view.frame.pos.x) +","+ (e.clientY - view.frame.pos.y));
                    view.level.handleMouseMove(new Vector(e.clientX - view.frame.pos.x, e.clientY - view.frame.pos.y));
                }
        });
        /* //console.log(e.clientX+","+e.clientY);
        var pos = new Vector(Math.floor(e.clientX / this.level.tile_size),Math.floor(e.clientY / this.level.tile_size)); 
        //console.log(pos);
        this.level.tile_active = this.level.grille[pos.x][pos.y];
        
        if ((this.level.old_tile_active == null) || (this.level.old_tile_active != this.level.tile_active)) {
            this.level.old_tile_active = this.level.tile_active;
        } */
            
        
        
        
    }
}


////////////////////////////////////////////////////////////////////////
/////////////////////  GAME MANAGER  ///////////////////////////////////
////////////////////////////////////////////////////////////////////////
var GameManager = new function() {
	this.totalBricks = 0;
	this.lifes = 0;
	this.end = false;
	this.mouseX;
	this.divX;
	this.divY;

	this.init = function(bricks, lifes) {
		this.totalBricks = bricks;
		this.lifes = lifes;
	};

	this.decreaseLifes = function() {
		this.lifes--;
	};

	this.decreaseBricks = function() {
	this.totalBricks--;
	};
}

function start() {
	var boardw = 300, boardh = 500;

	Game.init(boardw, boardh);

	GameManager.init(6, 3);

	var board1 = new Board();

	Game.addBoard(0, board1);

	var imagenBall = new Image();
    imagenBall.src = 'img/ball.png';
	var pelota = new Ball(imagenBall, 50, 50, 3, 3, 15, 15, 50, 50, boardw, boardh);

	var imagenBar = new Image();
    imagenBar.src = 'img/bar.png';

    var barra = new Bar(imagenBar, boardw/2 - 80/2, 350, 60, 10, 80, 15, boardw, boardh);

    var imagenBrick = new Image();
    imagenBrick.src = 'img/brick.png';

    document.getElementById("gamecontainer").onmousemove = function(event) {
        GameManager.mouseX = event.clientX;
    };

	board1.add(pelota);
	board1.add(barra);

	board1.add(new Brick(imagenBrick, 5, 10, 30, 15, 50, 30));
	//board1.add(new Brick(imagenBrick, 37, 10, 30, 15, 50, 30));
	board1.add(new Brick(imagenBrick, 69, 10, 30, 15, 50, 30));
	//board1.add(new Brick(imagenBrick, 101, 10, 30, 15, 50, 30));
	board1.add(new Brick(imagenBrick, 133, 10, 30, 15, 50, 30));
	//board1.add(new Brick(imagenBrick, 165, 10, 30, 15, 50, 30));

	//board1.add(new Brick(imagenBrick, 5, 30, 30, 15, 50, 30));
	board1.add(new Brick(imagenBrick, 37, 30, 30, 15, 50, 30));
	//board1.add(new Brick(imagenBrick, 69, 30, 30, 15, 50, 30));
	board1.add(new Brick(imagenBrick, 101, 30, 30, 15, 50, 30));
	//board1.add(new Brick(imagenBrick, 133, 30, 30, 15, 50, 30));
	board1.add(new Brick(imagenBrick, 165, 30, 30, 15, 50, 30));
};

////////////////////////////////////////////////////////////////////////
/////////////////////  BALL SPRITE  ////////////////////////////////////
////////////////////////////////////////////////////////////////////////
var Ball = function(image, x, y, vx, vy, w, h, spritew, spriteh, boardw, boardh) {
	this.setup(image, x, y, w, h, spritew, spriteh);
	this.vx = vx;
	this.vy = vy;
	this.boardw = boardw;
	this.boardh = boardh;
};

Ball.prototype = new Sprite();
Ball.prototype.step = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x + this.w >= this.boardw) 
        this.vx *= -1;
    if (this.y <= 0)
        this.vy *= -1;

    var col = this.board.collide(this, 1);

	if (col) {
		if (col.vertical)
			this.vy *= -1;
		else if (col.horiz)
			this.vx *= -1;
	}

    if (this.y + this.h >= this.boardh) {
    	GameManager.decreaseLifes();
    	if (GameManager.lifes == 0) {
    		this.board.remove(this);
    		console.log('perdiste');
    	}
    	else {
    		console.log('te quedan ' + GameManager.lifes + ' vidas');
    		this.vy *= -1;
    		this.x = 100;
    		this.y = 100; 
    	}
    }
};


////////////////////////////////////////////////////////////////////////
/////////////////////  BAR SPRITE  /////////////////////////////////////
////////////////////////////////////////////////////////////////////////
var Bar = function(image, x, y, w, h, spritew, spriteh, boardw, boardh) {
	this.setup(image, x, y, w, h, spritew, spriteh);
	this.boardw = boardw;
	this.boardh = boardh;
}

Bar.prototype = new Sprite();
Bar.prototype.step = function() {
	var tmp = GameManager.mouseX;
	var divX = document.getElementById("gamecontainer").getBoundingClientRect().left;

	if (tmp - (this.w/2) > divX && tmp + (this.w/2) < this.boardw + divX)
		this.x = tmp - divX - (this.w/2);
};


////////////////////////////////////////////////////////////////////////
/////////////////////  BRICK SPRITE  ///////////////////////////////////
////////////////////////////////////////////////////////////////////////
var Brick = function(image, x, y, w, h, spritew, spriteh) {
	this.setup(image, x, y, w, h, spritew, spriteh);
	this.tocado = false;
};

Brick.prototype = new Sprite();
Brick.prototype.step = function() {
	var col = this.board.collide(this, 0);

	if (col) {
		GameManager.decreaseBricks();
		//col.col.vy *= -1;
		if (col) {
			if (col.vertical)
				col.col.vy *= -1;
			if (col.horiz)
				col.col.vx *= -1;
		}
		this.board.remove(this);

		if (GameManager.totalBricks == 0) {
			console.log('fin');
			GameManager.end = true;
			this.board.remove(col.col);
		}
	}
};

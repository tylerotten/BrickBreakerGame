var Game = new function() {
	var boards = [];
	//var ctx, canvas;

	this.init = function(boardw, boardh) {
		var containerElement = document.getElementById("gamecontainer");
    	this.canvas = document.createElement("canvas");
	    // Handle error here for old browsers
	    this.canvas.width = boardw;
	    this.canvas.height = boardh;
	    this.canvas.className = 'canvas';
	    this.ctx = this.canvas.getContext("2d");
	    if(!this.ctx)
	        window.alert("Update your browser!");
	    
	    containerElement.appendChild(this.canvas);

		this.loop();
	};

	this.loop = function() {
		requestAnimationFrame(Game.loop);
		Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
		for (var i=0, len=boards.length; i < len; i++) {
			Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
			boards[i].step();
			boards[i].draw();
		}
	};

	this.addBoard = function(num, board) {
		boards[num] = board;
	};
};

var Board = function() {
	var objects = [];
	var toRemove = [];

	this.step = function() {
		toRemove = [];
		for (var i=0, len=objects.length; i < len; i++)
			objects[i].step();

		for (var i = 0, len=toRemove.length; i < len; i++)
			objects.splice(toRemove[i], 1);
		
	};

	this.draw = function() {
		for (var i=0, len=objects.length; i < len; i++)
			objects[i].draw();
	};

	this.add = function(obj) {
		obj.board = this;
		obj.boardPos = objects.length;
		objects.push(obj);
	};

	this.remove = function(obj) {
		//objects.splice(pos, 1);
		toRemove.push(objects.indexOf(obj));
	};

	this.collide = function(obj1, o2) {
		var obj2 = objects[o2];

		if (obj1 == null || !obj2)
			return false;

		var x1 = obj1.x, y1 = obj1.y, w1 = obj1.w, h1 = obj1.h;
		var x2 = obj2.x, y2 = obj2.y, w2 = obj2.w, h2 = obj2.h;
	

		if (((x1+w1 >= x2 && x1 <= x2) || (x2 + w2 >= x1 && x2 <= x1)) 
			&& ((y1 + h1 >= y2 && y1 <= y2) || (y2 + w2 >= y1 && y2 <= y1))) {
			var ret = {col : obj2};
		
			var m = abs(y1 + h1 - y2), l = abs(x1 + w1 - x2);

			if (m < l) {
				ret.vertical = true;
				ret.horiz = false;
			}
			else if (m > l) {
				ret.vertical = false;
				ret.horiz = true;
			}
			else
				ret.vertical = true;
				ret.horiz = true;

			return ret;
		}


		/*if (((x1+w1 >= x2 && x1 <= x2) || (x2 + w2 >= x1 && x2 <= x1)) 
			&& ((y1 + h1 >= y2 && y1 <= y2) || (y2 + w2 >= y1 && y2 <= y1)))
			return obj2;*/

		return false;
	};
};

function abs(a) {
	if (a < 0)
		a *= -1;
	return a;
}

var Sprite = function() {
	this.setup = function(image, x, y, w, h, spritew, spriteh) {
		this.image = image;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.spritew = spritew;
		this.spriteh = spriteh;
	}

	this.step = function() {

	};

	this.draw = function() {
		Game.ctx.drawImage(this.image, 0, 0, this.spritew, this.spriteh, this.x, this.y, this.w, this.h);
	};
};
// Shahria Kazi CSE 190m Section MK TA: Tyler Rigsby May 17th 2012
// This javascript code implements the game called "15 puzzle".
// Tiles are intially in their correct position and clicking on shuffle randomizes the location
// of those tiles. When tiles are movable, their border and text-color highlights to red.

"use strict";

// global variables
var row = 3;
var col = 3;
var TILE_AREA = 100;
var PUZZLE_AREA = 4;

// executes functions based on various events
window.onload = function() {
	setupPuzzle();
	$("shufflebutton").observe("click", shuffle);
};

// gives id's to each tiles, sets location and background of all tiles on the page
function setupPuzzle() {
	var tiles = $$("#puzzlearea div");
	for(var i = 0; i < tiles.length; i++) {
		// add unique ids to each tile
		tiles[i].id = "square_" + (parseInt(i / PUZZLE_AREA) + 1) + "_" + (i % PUZZLE_AREA + 1);

		// set position of tiles all on the page
		var x = (i % PUZZLE_AREA) * TILE_AREA;
		var y = parseInt(i / PUZZLE_AREA) * TILE_AREA;
		tiles[i].style.left = x + "px";
		tiles[i].style.top = y + "px";
		
		// set background image
		tiles[i].style.backgroundPosition = (-x) + "px" + " " + (-y) + "px";
		
		// call function based on the mouse events
		addClass(); // update tiles that can be moved
		tiles[i].observe("click", tileClick);
		tiles[i].observe("mouseover", addClass);
	}
}

// called when user clicks on the tile
function tileClick() {
	moveOneTile(this);
}

// swaps a tile with the empty square tile if it's movable
function moveOneTile(tile) {
	var left = tile.getStyle("left");
	var top = tile.getStyle("top");

	if(canMove(tile)) {
		// updating id's while moving tiles
		var row_id = parseInt(col) % TILE_AREA + 1;
		var col_id = parseInt(row) % TILE_AREA + 1;
		tile.id = "square_" + row_id + "_" + col_id;
		
		// swapping location of the tile clicked with the empty square tile
		tile.style.left = parseInt(row) * TILE_AREA + "px";
		tile.style.top = parseInt(col) * TILE_AREA + "px";
		row = left;
		col = top;
		
		// scaling down row and column
		row = parseInt(row) / TILE_AREA;
		col = parseInt(col) / TILE_AREA;
		addClass(); // update tiles that can be moved
	}
}

// returns whether or not a tile can move (can move if it is surrounded by the empty square)
function canMove(tile) {
	var left = parseInt(tile.getStyle("left"));
	var top = parseInt(tile.getStyle("top"));
	var otherLeft = parseInt(row) * TILE_AREA;
	var otherTop = parseInt(col) * TILE_AREA;
	
	// checks to see if the tile is next to the empty square tile
	if(Math.abs(otherLeft - left) == TILE_AREA && Math.abs(otherTop - top) == 0) {
		return true;
	} else if(Math.abs(otherLeft - left) == 0 && Math.abs(otherTop - top) == TILE_AREA) {
		return true;
	} else {
		return false;
	}
}

// adds a class name to all the movable tiles
function addClass() {
	var tiles = $$("#puzzlearea div");
	for(var i = 0; i < tiles.length; i++) {

		// adding/removing classNames based on whether they are movable
		if(canMove(tiles[i])) {
		    tiles[i].addClassName("movablepiece");
		} else {
			tiles[i].removeClassName("movablepiece");
		}
	}
}

// randomly picking tiles and swapping the location of those tiles
function updateTiles() {
	var randTile = parseInt(Math.random() * $$(".movablepiece").length);
	moveOneTile($$(".movablepiece")[randTile]);
}

// repetitively shuffles the tiles in board to random positions
function shuffle() {
	// shuffle the tiles 200 times
	for(var i = 0; i <= 2 * TILE_AREA; i++) {
		updateTiles();
	}
}
// Class for visualitzation of the stack in a PDA
// Written by Brannon Angers and Nick Eda

$(document).ready(function() {
  "use strict";
  if (typeof JSAV === "undefined") { return; }

  /*
  Stack class implementation
  Extended from the JSAV array class.
  element is an array with values to put into the tape
  x_coord is the x-coordinate
  y-coord is the y-coordinate
  */
  function Stack(jsav, element, x_coord, y_coord, options) {
    this.cell_size = 30;

    this.jsav = jsav;
    this.stack = element;
    this.displayStack = null;
    this.x_coord = x_coord;
    this.y_coord = y_coord;
    this.options = options;
    this.arr = null

    if ($.isArray(element)) {

      //default position of array's top center and call JSAV array constructor
      var left_arr = String(x_coord) + "px";
      var top_arr = String(y_coord - 16) + "px";
      this.formStack()
      this.arr = this.jsav.ds.array(this.displayStack, {left: left_arr, top: top_arr, layout: 'vertical'});

      this.arr.css(0, {"background": "yellow"});

    }

  }

  // Add the Stack constructor to the public facing JSAV interface.
  JSAV.ext.ds.stack = function(element, x_coord, y_coord, options) {
    return new Stack(this, element, x_coord, y_coord, options);
  };
  JSAV.utils.extend(Stack, JSAV._types.ds.AVArray);

  var Stackproto = Stack.prototype

  Stackproto.update = function(newStack) {
    this.stack = newStack
    this.arr.hide()

    //default position of array's top center and call JSAV array constructor
    var left_arr = String(this.x_coord) + "px";
    var top_arr = String(this.y_coord - 16) + "px";

    this.formStack()
    this.arr = this.jsav.ds.array(this.displayStack, {left: left_arr, top: top_arr, layout: 'vertical'});
    
    this.arr.css(0, {"background": "yellow"});
  }

  Stackproto.hide = function() {
    this.arr.hide()
  }

  Stackproto.formStack = function() {
    var graph = $('#' + this.jsav.id() + ' > .jsavcanvas > .jsavgraph')

    if ( this.x_coord + (this.stack.length * this.cell_size) > graph.height() ) {
      var distance = graph.height() - this.x_coord;
      var cellsToShow = (distance / this.cell_size);
      var tempArr = this.stack.slice(0, cellsToShow);
      tempArr.push('...');
      this.displayStack = tempArr;
    } 
    else {
      this.displayStack = this.stack;
    }
  }

}(jQuery));
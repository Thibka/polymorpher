Description
==================
SVG polygon morphing class.
[Demo](https://jsfiddle.net/jstze2vu/2/).


Usage
==================

```javascript
var morpher = new Polymorpher({
    element: mask, // DOM element
    endPoints: "", // New set of points. Ex: "x1,y1 x2,y2 ...". The new set must contain as many points as in the initial polygon.
    duration: 2500, 
    easing: "ease-in-out" // "ease-out", "ease-in", "ease-in-out", or "linear"
});
	
morpher.start();
```
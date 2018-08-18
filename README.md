Description
==================
SVG polygon morphing.
[Demo](https://jsfiddle.net/jstze2vu/2/).


Usage
==================

```javascript
var polygonMorphing = new Polymorpher({
    element: mask, // Élément HTML
    endPoints: "", // Nouvel ensemble de points du polygone à animer, au format "x1,y1 x2,y2". Le nouvel ensemble doit contenir autant de points que dans le polygone initial.
    duration: 2500, 
    easing: "ease-in-out" // "ease-out", "ease-in", "ease-in-out", ou "linear"
});
	
polygonMorphing.start();
```
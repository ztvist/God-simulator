window.Camera = {
  x:0,y:45,zoom:1,dragging:false,lastX:0,lastY:0,
  screenPoint(e,canvas){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};},
  pan(dx,dy){this.x+=dx;this.y+=dy;},
  reset(){this.x=0;this.y=45;this.zoom=1;}
};
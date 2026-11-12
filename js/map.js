window.GameMap = {
  cols: 18, rows: 18, tileW: 54, tileH: 28,
  terrain: [],
  init(){
    this.terrain=[];
    for(let y=0;y<this.rows;y++){
      const row=[];
      for(let x=0;x<this.cols;x++){
        let t="grass";
        if((x*17+y*13)%19===0)t="tree";
        if((x*7+y*11)%31===0)t="rock";
        if(y>13 && x>10 && (x+y)%3===0)t="water";
        row.push(t);
      }
      this.terrain.push(row);
    }
  },
  toScreen(x,y,cx,cy){return {x:(x-y)*this.tileW/2+cx,y:(x+y)*this.tileH/2+cy};},
  fromScreen(px,py,cx,cy){
    const a=(px-cx)/(this.tileW/2), b=(py-cy)/(this.tileH/2);
    return {x:Math.floor((a+b)/2),y:Math.floor((b-a)/2)};
  }
};
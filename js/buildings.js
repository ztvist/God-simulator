window.Buildings = {
  definitions:{
    hut:{name:"Pondok",emoji:"🛖",wood:20,stone:0,pop:2},
    campfire:{name:"Api unggun",emoji:"🔥",wood:10,stone:0,pop:0},
    farm:{name:"Ladang",emoji:"🌱",wood:15,stone:0,pop:0},
    storage:{name:"Gudang",emoji:"📦",wood:25,stone:5,pop:0},
    woodcutter:{name:"Kemah penebang",emoji:"🪓",wood:30,stone:0,pop:0},
    gatherer:{name:"Kemah pengumpul",emoji:"🫐",wood:25,stone:0,pop:0}
  },
  place(x,y,type,state){
    const d=this.definitions[type];
    if(!d||x<0||y<0||x>=GameMap.cols||y>=GameMap.rows)return false;
    if(state.structures.some(s=>s.x===x&&s.y===y))return false;
    if(GameMap.terrain[y][x]==="water")return false;
    if(state.inventory.wood<d.wood||state.inventory.stone<d.stone)return false;
    state.inventory.wood-=d.wood;state.inventory.stone-=d.stone;
    state.structures.push({x,y,type});
    state.population+=d.pop;
    return true;
  }
};
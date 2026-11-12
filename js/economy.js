window.Economy = {
  daily(state){
    const cutters=state.structures.filter(s=>s.type==="woodcutter").length;
    state.inventory.wood+=cutters*3;
    state.inventory.coins+=Math.max(1,Math.floor(state.population/3));
  }
};
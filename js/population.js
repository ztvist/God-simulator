window.Population = {
  daily(state){
    const huts=state.structures.filter(s=>s.type==="hut").length;
    const farms=state.structures.filter(s=>s.type==="farm").length;
    const gatherers=state.structures.filter(s=>s.type==="gatherer").length;
    state.inventory.food += farms*3 + gatherers*2;
    const need=state.population;
    state.inventory.food=Math.max(0,state.inventory.food-need);
    if(state.inventory.food===0 && need>0)state.population=Math.max(1,state.population-1);
    else if(huts>0 && state.inventory.food>need && state.day%3===0)state.population+=1;
  }
};
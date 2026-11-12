(() => {
  const canvas=document.getElementById("world"),ctx=canvas.getContext("2d");
  GameMap.init();
  let state=SaveGame.load()||{
    day:1,population:3,inventory:Inventory.defaults(),structures:[],selected:"hut"
  };
  let pointer=null,moved=false;
  const $=id=>document.getElementById(id);

  function resize(){
    const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.floor(r.width*dpr);canvas.height=Math.floor(r.height*dpr);
    draw();
  }
  function center(){return {x:canvas.clientWidth/2+Camera.x,y:35+Camera.y};}
  function polygon(points,fill,stroke){
    ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
    ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}
  }
  function draw(){
    const w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);
    ctx.fillStyle="#78956a";ctx.fillRect(0,0,w,h);
    const c=center(),tw=GameMap.tileW*Camera.zoom,th=GameMap.tileH*Camera.zoom;
    for(let sum=0;sum<GameMap.cols+GameMap.rows;sum++){
      for(let y=0;y<GameMap.rows;y++){
        const x=sum-y;if(x<0||x>=GameMap.cols)continue;
        const p=GameMap.toScreen(x,y,c.x,c.y);
        const px=p.x*Camera.zoom,py=p.y*Camera.zoom;
        const tile=[{x:px,y:py},{x:px+tw/2,y:py+th/2},{x:px,y:py+th},{x:px-tw/2,y:py+th/2}];
        const t=GameMap.terrain[y][x];
        const color=t==="water"?"#4c91a0":t==="tree"?"#648b4e":t==="rock"?"#8b8d79":((x+y)%2?"#91ad69":"#9ab773");
        polygon(tile,color,"#78965d");
        if(t==="tree"){ctx.font=`${18*Camera.zoom}px serif`;ctx.textAlign="center";ctx.fillText("🌳",px,py+th*.78);}
        if(t==="rock"){ctx.font=`${16*Camera.zoom}px serif`;ctx.textAlign="center";ctx.fillText("🪨",px,py+th*.8);}
      }
    }
    for(const s of state.structures){
      const p=GameMap.toScreen(s.x,s.y,c.x,c.y);
      const px=p.x*Camera.zoom,py=p.y*Camera.zoom;
      const d=Buildings.definitions[s.type];
      ctx.font=`${25*Camera.zoom}px serif`;ctx.textAlign="center";ctx.fillText(d.emoji,px,py+th*.55);
    }
  }
  function updateUI(){
    $("coins").textContent=state.inventory.coins;$("gems").textContent=state.inventory.gems;
    $("population").textContent=state.population;$("day").textContent=state.day;
    ["wood","stone","berries","food","tools"].forEach(k=>$(k).textContent=state.inventory[k]||0);
    document.querySelectorAll("[data-build]").forEach(b=>b.classList.toggle("selected",b.dataset.build===state.selected));
  }
  function message(t){$("message").textContent=t;}
  function save(silent=false){SaveGame.save(state);if(!silent)message("Permainan berhasil disimpan di perangkat.");}
  document.querySelectorAll("[data-build]").forEach(b=>b.addEventListener("click",()=>{
    state.selected=b.dataset.build;updateUI();message("Mode "+Buildings.definitions[state.selected].name+". Ketuk tanah untuk membangun.");
  }));
  $("gatherWood").onclick=()=>{Inventory.add(state,"wood",8);updateUI();save(true);message("Kamu mengumpulkan 8 kayu.");};
  $("gatherStone").onclick=()=>{Inventory.add(state,"stone",5);updateUI();save(true);message("Kamu mengumpulkan 5 batu.");};
  $("nextDay").onclick=()=>{Simulation.nextDay(state);updateUI();draw();save(true);message("Hari baru dimulai. Produksi dan kebutuhan penduduk diperbarui.");};
  $("saveGame").onclick=()=>save();
  $("resetCamera").onclick=()=>{Camera.reset();draw();};

  canvas.addEventListener("pointerdown",e=>{
    canvas.setPointerCapture(e.pointerId);pointer=Camera.screenPoint(e,canvas);moved=false;Camera.dragging=true;
  });
  canvas.addEventListener("pointermove",e=>{
    if(!Camera.dragging||!pointer)return;
    const p=Camera.screenPoint(e,canvas),dx=p.x-pointer.x,dy=p.y-pointer.y;
    if(Math.abs(dx)+Math.abs(dy)>3)moved=true;
    Camera.pan(dx,dy);pointer=p;draw();
  });
  canvas.addEventListener("pointerup",e=>{
    if(!moved&&pointer){
      const p=Camera.screenPoint(e,canvas),c=center();
      const tx=p.x/(Camera.zoom)-c.x/(Camera.zoom),ty=p.y/(Camera.zoom)-c.y/(Camera.zoom);
      const tile=GameMap.fromScreen(tx,ty,c.x/(Camera.zoom),c.y/(Camera.zoom));
      if(Buildings.place(tile.x,tile.y,state.selected,state)){
        updateUI();draw();save(true);message(Buildings.definitions[state.selected].name+" berhasil dibangun.");
      }else message("Tidak bisa membangun di sini. Periksa lahan dan sumber daya.");
    }
    Camera.dragging=false;pointer=null;
  });
  canvas.addEventListener("wheel",e=>{e.preventDefault();Camera.zoom=Math.max(.65,Math.min(1.7,Camera.zoom+(e.deltaY<0?.08:-.08)));draw();},{passive:false});
  window.addEventListener("resize",resize);
  updateUI();resize();
  if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js").catch(()=>{});
})();
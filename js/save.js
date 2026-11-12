window.SaveGame = {
  key:"godSimulatorPrimitive_v1",
  save(state){localStorage.setItem(this.key,JSON.stringify(state));},
  load(){try{const raw=localStorage.getItem(this.key);return raw?JSON.parse(raw):null;}catch(e){return null;}}
};
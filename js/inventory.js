window.Inventory = {
  defaults(){return {wood:80,stone:30,berries:20,food:30,tools:1,coins:100,gems:10};},
  add(state,key,n){state.inventory[key]=(state.inventory[key]||0)+n;}
};
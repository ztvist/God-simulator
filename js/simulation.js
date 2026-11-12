window.Simulation = {
  nextDay(state){state.day++;Population.daily(state);Economy.daily(state);}
};
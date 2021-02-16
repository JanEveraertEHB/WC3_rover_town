"use strict"

import { items } from './items.js';
import { rovers, habitat } from './index.js';

let todo = []

const automation = {
  run: function() {
    
  },
  displayStatus: function() {
    
  },
  moveToTask:function(rover, task) {
    
  }
}

setInterval(() => {
  automation.run();
}, 5000);
setInterval(() => {
  automation.displayStatus()
}, 500);

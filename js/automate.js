"use strict"

import { items } from './items.js';
import { rovers, habitat } from './index.js';
import { roverItems } from './rovers.js';

let todo = []

const automation = {
  run: function() {
  },
  displayStatus: function() {
    
  },
  moveToTask:function(rover, task) {
    
  },
  performTask: function(roverHandle, task) {
  }
}

setInterval(() => {
  automation.run();
  rovers.render();
  habitat.render();
  habitat.update();
}, 500);
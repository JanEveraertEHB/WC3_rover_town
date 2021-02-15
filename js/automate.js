"use strict"

import { items } from './items.js';
import { rovers, habitat } from './index.js';
import { roverItems } from './rovers.js';

let todo = []

const automation = {
  run: function() {
    // get a list of the rovers
    const itemsSorted =[];
    Object.keys(items).forEach((key) => {
      itemsSorted.push(items[key]);
    });
    itemsSorted.sort((a, b) => a.timeUntillMaintenance - b.timeUntillMaintenance);
    itemsSorted.forEach((habitat) => {
      if(habitat.timeUntillMaintenance < 18) {
        // something up with this one
        if(todo.findIndex((e) => e.task == habitat.handle) ==  -1) {
          const r = rovers.getIdleRover();
          if(typeof r !== "undefined") {
            rovers.setRoverState(r.handle, habitat.handle)
            todo.push({
              task: habitat.handle,
              rover: r
            })
          }
          else {
            // rovers busy
          }
        }
      }
    })
    todo.forEach((todoTask) => {
      this.moveToTask(todoTask.rover, todoTask.task)
    })
    
  },
  displayStatus: function() {
    document.getElementById("statusWrapper").innerHTML = "";
    Object.keys(items).forEach((key) => {
      const obj = items[key];
      const el = document.createElement("div");
      el.classList.add("statusBar");
      el.innerHTML = obj.handle + ": " + obj.timeUntillMaintenance
      document.getElementById("statusWrapper").insertAdjacentElement("beforeEnd", el)
    })
    roverItems.forEach((obj) => {
      const el = document.createElement("div");
      el.classList.add("statusBar");
      el.innerHTML = obj.handle + ": " + obj.state
      document.getElementById("statusWrapper").insertAdjacentElement("beforeEnd", el)
    })
  },
  moveToTask:function(rover, task) {
    if(rover != null) {
      const item = items[task];
      rovers.moveRoverTo(rover, item.position.x, item.position.y, task, this.performTask);
    }
  },
  performTask: function(roverHandle, task) {
    console.log("performed", roverHandle, task)
    habitat.performTask(roverHandle, task);
    todo = todo.filter((e) => e.task !== task)
  }
}

setInterval(() => {
  automation.run();
}, 5000);
setInterval(() => {
  automation.displayStatus()
}, 200)
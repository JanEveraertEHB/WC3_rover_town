"use strict"

import { items } from './items.js';
import { rovers, habitat } from './index.js';
import { roverItems } from './rovers.js';

let todo = []

const automation = {
  run: function() {
    // get a list of the rovers
    Object.keys(items).forEach((key) => {
      if(items[key].timeUntillMaintenance < 18) {
        // something up with this one
        if(todo.findIndex((e) => e.task == key) ==  -1) {
          const r = rovers.getIdleRover();
          if(typeof r !== "undefined") {
            rovers.setRoverState(r.handle, key)
            todo.push({
              task: key,
              rover: r
            })
          }
          else {
            // rovers busy
          }
        }
      }
    })
    console.log(todo)
    todo.forEach((todoTask) => {
      this.moveToTask(todoTask.rover, todoTask.task)
    })
    
    this.displayStatus();
  },
  displayStatus: function() {
    document.getElementById("statusWrapper").innerHTML = "";
    Object.keys(items).forEach((key) => {
      const obj = items[key];
      const el = document.createElement("div");
      el.classList.add("statusBar");
      el.innerHTML = obj.handle + " - " + obj.timeUntillMaintenance
      document.getElementById("statusWrapper").insertAdjacentElement("beforeEnd", el)
    })
    roverItems.forEach((obj) => {
      const el = document.createElement("div");
      el.classList.add("statusBar");
      el.innerHTML = obj.handle + " - " + obj.state + " [" + obj.position.x + "," + obj.position.x + "]"
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
  rovers.render();
  habitat.render();
  habitat.update();
}, 500);
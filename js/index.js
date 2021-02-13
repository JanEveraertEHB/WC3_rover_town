"use strict";

import { items } from './items.js';
import { roverItems } from './rovers.js';

const environment = {
  render: function() {
    const container = document.getElementById("container");
    for(let i = 0; i < 20; i++) {
      const row = document.createElement("div");
      row.id = `row-${i}`;
      for(let j = 0; j < 20; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("x", i);
        cell.setAttribute("y", j);
        row.appendChild(cell)
      }
      container.appendChild(row)
    }
  }
}
environment.render();

export const rovers = {
  render: function() {
    const rovers = document.getElementsByClassName("rover");
    Array.from(rovers).forEach(r => r.remove())

    const cells = document.getElementsByClassName("cell");
    roverItems.forEach((rover) => {
      const matchingCells = Array.from(cells).filter((a) => a.getAttribute("x") == rover.position.x && a.getAttribute("y") == rover.position.y);
      matchingCells.forEach((cell) => {
        const r = document.createElement("div");
        r.classList.add("rover")
        r.classList.add(rover.handle)
        r.classList.add(rover.state)
        cell.appendChild(r)
      })
    })
  },
  moveRoverTo: function(rover, x,  y, task, arrivedCallback) {
    const index = roverItems.findIndex((r) => r.handle == rover.handle)
    const r = roverItems[index];
    if(Math.abs(r.position.x - x) == 0 && Math.abs(r.position.y - y) == 0) {
      arrivedCallback(r.handle, task);
    }
    else {
      if(r.position.x < x) { roverItems[index].position.x++; }
      if(r.position.x > x) { roverItems[index].position.x--; }
      if(r.position.y < y) { roverItems[index].position.y++; }
      if(r.position.y > y) { roverItems[index].position.y--; }
    }

  },
  getRoverWithState:(status) => {
    let taskedRovers =  roverItems.filter((rover) => {
      return rover.state == status
    })
    const sel = Math.floor(Math.random() * taskedRovers.length);
    return taskedRovers[sel]
  },
  getIdleRover:() => {
    let idleRovers =  roverItems.filter((rover) => {
      return rover.state == "idle"
    })
    const sel = Math.floor(Math.random() * idleRovers.length);
    return idleRovers[sel]
  },
  setRoverState: function(roverHandle, state) {
    const index = roverItems.findIndex((e) => e.handle == roverHandle)
    roverItems[index].state = state
    console.log(`rover ${roverHandle} set to idle`)
  }
}
rovers.render();

export const habitat = {
  render: function() {
    const itemsNow = document.getElementsByClassName("item");
    Array.from(itemsNow).forEach(r => r.remove())

    const cells = document.getElementsByClassName("cell");
    Object.keys(items).forEach((handle) => {
      const item = items[handle];
      const matchingCells = Array.from(cells).filter((a) => a.getAttribute("x") == item.position.x && a.getAttribute("y") == item.position.y);
      matchingCells.forEach((cell) => {
        const genItem = document.createElement("div");
        genItem.classList.add("item")
        genItem.classList.add(item.handle)
        cell.appendChild(genItem)
      })
    })
  },
  performTask: function(roverHandle, task) {
    items[task].timeUntillMaintenance = 20;
    rovers.setRoverState(roverHandle, "idle")
  },
  update: function() {
    Object.keys(items).forEach((key) => {
      items[key].timeUntillMaintenance--;
    })
  }
}

habitat.render();


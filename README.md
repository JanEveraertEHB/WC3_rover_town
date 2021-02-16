# WC3_rover_town

## Concept

Probeer de rovers te automatiseren. Er zijn een aantal methoden die je tot je beschikking hebt. 


## Requirements

* Geef de status weer van elke habitat en elke rover
* Geen rechstreekse aanpassingen van locaties
* Je werkt enkel in de automate.js file
* Je gebruikt minstens een callback

## aanpak

1. begin bij een rover, comment andere rovers uit
2. haal de habitat elementen op en sorteer deze op "timeUntillMaintenance"
3. zorg dat de rover de meest dringende task aangeschreven krijgt, en hiernaartoe begint te bewegen
4. zorg voor een callback functie die je kan uitvoeren eens je op de locatie aankomt
5. Zorg dat het process werkt voor meerdere rovers.


## Functies 

* `rovers.getIdleRover` -> Zoek voor een rover die niets te doen heeft
* `rovers.setRoverState` -> Markeer een rover als "bezig"
* `rovers.moveRoverTo` -> De rover zal beginnen bewegen en rijden naar de taak. deze functie verwacht een callback functie, die deze zal uitvoeren eens de rover is aangekomen op de X en Y coordinaten die deze heeft doorgekregen
* `habitat.performTask` -> voer een taak uit

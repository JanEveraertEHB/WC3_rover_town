# WC3 - rovertown

## Concept

De bedoeling is dat je de vier rovers, aanwezig in de rovers.js, aan te sturen zodat ze de habitats in goede staat houden.
Dit doe je door de rovers naar de juiste habitat te sturen, en deze een taak te laten uitvoeren.

## Requirements

* Maak gebruik van een callback
* Je mag enkel aanpassingen doorvoeren in de automate.js file
* Geen rechtstreekse positie aanpassingen, maak gebruik van de functies


## Functies ter beschikking

* `moveRoverTo(rover, x, y, task, callback)` -> beweeg de rover naar een positie. Het zal even duren tegen dat deze hier toekomt, dus maak gebruik van de callback
* `getIdleRover(callback)` -> returns een rover die niets te doen heeft, na 500ms
* `performTask(roverHandle, task)` -> Voer een taak uit (en stel een habitat in orde)



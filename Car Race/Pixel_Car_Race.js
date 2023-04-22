"use strict";
window.onload = function() {

document.getElementById("reset").disabled = true;

    class Car {
    constructor(carType, imageType, vPosition) {
        this.carType = carType;
        this.image = imageType;
        this.vPosition = vPosition;
        this.hPosition = 0;
        this.finishedRace = false;
        this.wins = 0;
    }

    /**
    * Reset cars to the initial settings (except for the wins)
    */
    resetCar() {
        this.hPosition = 0;
        this.finishedRace = false;
    }

    /**
    * Moves a car based on a random number, will not move any more if the car is finished the race.
    */
    move() {
        this.hPosition += Math.random() * 10;
        if (this.hPosition >= 1000) {
            this.finishedRace = true;
        }
    }

    /**
    * Returns a dynamic string representing the images (cars) with specific style properties
    * @returns {string}
    */
    draw() {
        return "<img src='" + this.image + "' alt='car' style=' position: absolute; top:" + this.vPosition + "px; left:" + this.hPosition + "px;' />";

    }
}

class Race {
    constructor(carArray) {
        this.carArray = carArray;
        this.raceOver = false;
        this.standings = [];
        this.numCarsDone = 0;
        this.totalRaces = 0;
    }

    /**
     * Loops through the Race's car array to move each car and calls drawCars to animate them moving.
     * When the race is finished, outputs the race standings and updates total race count
     * and adds a win to the winning car
     */
    moveCars() {
        document.getElementById("reset").disabled = false;
        document.getElementById("start").disabled = true;
        document.getElementById("statistics").disabled = true;

            for (let i = 0; i < this.carArray.length; i++) {
                if (this.carArray[i].finishedRace === false) {
                    this.carArray[i].move();

                    if (this.carArray[i].finishedRace === true) {
                        this.standings.push(this.carArray[i]);
                        this.numCarsDone++;
                    }
                }
                this.drawCars();
            }
            if (this.numCarsDone === this.carArray.length) {
                this.raceOver = true;
                this.totalRaces++;
                this.standings[0].wins++;
            }

        if (this.raceOver === true) {
            let resultString = "";

            for (let j = 0; j < this.standings.length; j++) {
                resultString += "Position " + (j + 1) + ": " + this.standings[j].carType + "\n";
            }
            window.alert("STANDINGS\n" + resultString);
            document.getElementById("statistics").disabled = false;

        }
    }

    /**
     * Clears the HTML tag in the paragraph tag on the HTML page and then calls the draw function to re-append the string to the
     * innerHTML of the paragraph with its new properties
     */
    drawCars() {
        let outputString = "";
        document.getElementById("output").innerHTML = "";
        for (let i = 0; i < this.carArray.length; i++) {
            outputString += this.carArray[i].draw();
        }
        document.getElementById("output").innerHTML = outputString;


    }

    /**
     * Resets all cars back to the starting line by calling resetCar on each of them.
     * Also resets numCarsDone, raceOver, and standings
     */
    resetCars() {
        for (let i = 0; i < this.carArray.length; i++) {
            this.carArray[i].resetCar();
        }
        this.numCarsDone = 0;
        this.raceOver = false;
        this.standings = [];
        pixel500.drawCars();
    }

    /**
     * This will go through the carArray and check its win and adds it to a string, then opens an alert
     * box displaying the number of wins for each car
     */
    displayStats() {
        let statString = "";
        for (let i = 0; i < this.carArray.length; i++) {
            statString += this.carArray[i].carType + ": " + this.carArray[i].wins + "\n";
        }
        window.alert("Out of " + this.totalRaces + " races, the number of wins were as follows:\n" + statString);
    }

}
    const cars = [
        new Car("Classic", "images/car1.png", 150),
        new Car("Bug", "images/car2.png", 350),
        new Car("Hatchback", "images/car3.png", 550),
        new Car("Sedan", "images/car4.png", 750)
    ];
    const pixel500 = new Race(cars);
    pixel500.drawCars();

    //Start button
    document.getElementById("start").onclick = start;

    // Timer variable
    let timeoutId;

    /**
     * Starts the race and will reset the timer interval when race is finished
     */
    function pushStartButton() {
        pixel500.moveCars();
        if (pixel500.raceOver === true) {
            clearInterval(timeoutId);
        }
    }

    //Reset button
    document.getElementById("reset").onclick = pushResetButton;

    /**
     * Resets the car for a new race, Draws the cars to the initial positions and sets the state of the buttons as appropriate
     */
    function pushResetButton() {
        pixel500.resetCars();
        document.getElementById("start").disabled = false;
        document.getElementById("reset").disabled = true;
    }

    //Stats button
    document.getElementById("statistics").onclick = pushStatButton;

    /**
     * Displays the stats of all races run.
     */
    function pushStatButton() {
        pixel500.displayStats();
    }

    /**
     * Sets an interval of 10ms and begins the pushStartButton function and sets the state of the buttons as appropriate
     */
    function start() {
        timeoutId = setInterval(pushStartButton, 10);
        document.getElementById("start").disabled = true;
        document.getElementById("reset").disabled = false;
        document.getElementById("statistics").disabled = true;

    }

}
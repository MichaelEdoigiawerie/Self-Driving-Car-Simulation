let N = prompt("How many cars do you want to display? (At least 100 is recommended if you want the car to learn at a faster rate)");
if (!parseInt(N) || parseInt(N) > 1000 || parseInt(N) < 1) {
    N = "1";
    alert("Please don't put in letters or negative numbers next time, and don't try to generate more than 1000 cars unless your system can handle it");
} 

let topSpeed = prompt("How fast do you want the car to go? (Nothing more than 6 please)");
if (!parseInt(topSpeed) || parseInt(topSpeed) > 6 || parseInt(topSpeed) < 3) {
    topSpeed = "3";
    alert("Please don't put in letters or negative numbers next time, and make sure the top speed isn't greater than 6 or less than 3. Anything more than that is unnecessary.");
}

let trafficAmount = prompt("How many cars do you want to have in traffic? (Nothing more than 100)");
if (!parseInt(trafficAmount) || parseInt(trafficAmount) > 100 || parseInt(trafficAmount) < 5) {
    trafficAmount = "20";
    alert("Please don't put in letters or negative numbers next time, and don't put so many cars (anything higher than 100). It would hinder your system performance.");
}

const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 500;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;

const carContext = carCanvas.getContext("2d");
const networkContext = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9, 4);

const cars = generateCars(parseInt(N));
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if (i != 0) NeuralNetwork.mutate(cars[i].brain, 0.2);
    }
}

const traffic = [];
generateTraffic(parseInt(trafficAmount));

let showSensor = false;

animate();

function toggleSensor() {
    showSensor = !showSensor;
}

function saveCar() {//Save the best Performing Trial
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {//Discard if the trial is worthless
    localStorage.removeItem("bestBrain");
}

function generateTraffic(trafficAmount) {
    for (let i = 0; i < trafficAmount; i++) {
        const y = -i * 150 - 150;
        const lane = Math.floor(Math.random() * road.laneCount);
        traffic[i] = new Car(road.getLaneCenter(lane), 
        y, 60, 80, "DUMMY", 2, getRandomColor());
    } 
}

function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        let car = new Car(road.getLaneCenter(2), 100, 60, 80, "Artificial Intelligence");
        car.maxSpeed = parseInt(topSpeed);
        cars.push(car);
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
    bestCar = cars.find(c => c.y == Math.min(...cars.map(pos => pos.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carContext.save();
    carContext.translate(0, -bestCar.y + carCanvas.height * 0.7);
    road.draw(carContext);

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext);
    }
    carContext.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carContext);
    }
    carContext.globalAlpha = 1;
    bestCar.draw(carContext, showSensor);

    carContext.restore();

    networkContext.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkContext, bestCar.brain);
    requestAnimationFrame(animate);
}
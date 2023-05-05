# Self Driving Car Simulation
- This project basically shows what happens when a neural network and a car comes together. The neural network is implemented using a genetic algorithm. So the more scenarios it's exposed to, the faster it will learn.
## Instructions
- [Click Here](https://michaeledoigiawerie.github.io/Self-Driving-Car-Simulation/) to open the simulation.
## How To Use
- Upon starting the simulation, you are prompted to input the amount of cars to start with. You can think of each transparent car as a "trial".
- Then type in the speed of car.
- Then type in the amount of cars you want as your obstacles (Tip: Start small).
- Once you start, the simulation would appear on the left side of the screen, and to the right you'll see a vizualisation of the neural network.
## Controls
- Notice that there are three buttons at the center of the webpage.
    - The top button is used to `SAVE` the car's best performance onto your local storage.
    - The button at the center is used to `DELETE` all the data the car has taken in. This is mostly used in case you encounter a road block.
    - The button at the bottom is used to `TOGGLE` the visibility of the car's sensors.
## Tips
- **Please Note:** This process takes a little bit of time to get the hang of.
- The goal of the car is to pass all the obstacles in traffic. Once it has achieved that goal, use the `SAVE` button to store its best performance. Also save it's progress if it hits an obstacle. But don't save it if the car permanently tails an obstacle or hits the edge of the road.
- At least 100 "trial" cars are recommended for your car. The greater the "trial" cars, the faster it will learn. Any amount greater than 250 is acceptable, as long as your computer could handle it.
- If you see that your car isn't making any progress initially, refresh the page. 

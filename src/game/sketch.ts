import type P5 from "p5";
import { Bean } from './bean';
import { Subscribers } from "./subscribers";
export const sketch = (p5: P5) => {
    let bean: Bean;
    let subscribers: Subscribers;
    let speed = 8;
    let maxSpeed = 14;

    p5.setup = () => {
        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('game');
        bean = new Bean(p5);
        subscribers = new Subscribers(p5, speed);
    }

    p5.draw = () => {
        p5.background('#eaeff1');

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (subscribers.getPos() < 0) {
            if (speed < maxSpeed) {
                speed += 0.7;
            }

            subscribers = new Subscribers(p5, speed);
        } else {
            subscribers.show();
        }

        // Draw and update player
        bean.show();
        bean.update();

        subscribers.checkCollisions(bean.pos);
    }
}
import type P5 from "p5";
import { Bean } from './Bean';
import { Subscribers } from "./Subscribers";
export const sketch = (p5: P5) => {
    let bean: Bean;
    let subscribers: Subscribers;
    let speed = 3;

    p5.setup = () => {
        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('game');
        bean = new Bean(p5);
        subscribers = new Subscribers(p5, speed);
    }

    p5.draw = () => {
        p5.background('#eaeff1');
        bean.show();
        bean.update();

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (subscribers.getPos() < 0) {
            speed += 0.3;
            subscribers = new Subscribers(p5, speed);
        } else {
            subscribers.show();
        }
    }
}
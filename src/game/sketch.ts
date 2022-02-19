import type P5 from "p5";
import { Bean } from './bean';
import { ScoreBoard } from "./scoreBoard";
import { Subscribers } from "./subscribers";
import { gameSize } from "./utils";

export const sketch = (p5: P5) => {
    let bean: Bean;
    let subscribers: Subscribers;
    let scoreBoard: ScoreBoard;
    let speed = 8;
    let maxSpeed = 14;

    p5.setup = () => {
        const canvas = p5.createCanvas(gameSize().width, gameSize().height);
        canvas.parent('game');
        scoreBoard = new ScoreBoard(p5);
        bean = new Bean(p5);
        subscribers = new Subscribers(p5, speed);

        window.onresize = (e: UIEvent) => {
            p5.resizeCanvas(gameSize().width, gameSize().height);
            bean.spawn();
        }
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

        bean.update();

        scoreBoard.update();

        subscribers.checkCollisions(bean.pos);
    }
}
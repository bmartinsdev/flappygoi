import type P5 from "p5";
import 'p5/lib/addons/p5.sound';
import { Bean } from './bean';
import { ScoreBoard } from "./score";
import { Subscribers } from "./subscribers";
import { gameSize } from "./utils";
import { Spam } from './spam';

export const sketch = function (p5: P5) {
    let bean: Bean;
    let spam: Spam;
    let subscribers: Subscribers;
    let scoreBoard: ScoreBoard;
    let assets: any = {

    };
    let speed = 8;
    let maxSpeed = 14;

    p5.preload = function () {
        assets = {
            bean: {
                sounds: {
                    subscribe: p5.loadSound('assets/sound/subscribe.ogg')
                }
            }
        }
    }

    p5.setup = function () {
        const canvas = p5.createCanvas(gameSize().width, gameSize().height);
        canvas.parent('game');
        scoreBoard = new ScoreBoard(p5);

        bean = new Bean(p5, assets.bean);
        subscribers = new Subscribers(p5, speed);

        spam = new Spam(p5, speed / 2);

        window.onresize = (e: UIEvent) => {
            p5.resizeCanvas(gameSize().width, gameSize().height);
            bean.spawn();
        }
    }

    p5.draw = function () {
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

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (spam.getPos() < -200) {
            if (spam.speed < maxSpeed) {
                spam.speed += 0.7;
            }

            spam = new Spam(p5, spam.speed);
        } else {
            spam.update();
        }

        bean.update();

        scoreBoard.update();

        subscribers.checkCollisions(bean.pos);
        spam.checkCollision(bean.pos);
    }
}
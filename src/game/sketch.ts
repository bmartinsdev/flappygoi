import type P5 from "p5";
import 'p5/lib/addons/p5.sound';
import { Bean } from './objects/bean';
import { ScoreBoard } from "./ui/score";
import { Subscribers } from "./objects/subscribers";
import { gameEvents, gameSize } from "./shared/utils";
import { Spam } from './objects/spam';

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
                    subscribe: p5.loadSound('assets/sound/subscribe.ogg'),
                    unsubscribe: p5.loadSound('assets/sound/unsubscribe.ogg')
                },
                sprites: {
                    idle: [],
                    unsubscribed: p5.loadImage('assets/sprites/bean/hit.png'),
                    jump: p5.loadImage('assets/sprites/bean/jump.png')
                }
            },
            spam: {
                sprite: p5.loadImage('assets/sprites/spam.png')
            },
            subscriber: {
                sprite: p5.loadImage('assets/sprites/subscriber.png')
            }
        }
        assets.bean.sprites.idle.push(p5.loadImage('assets/sprites/bean/idle_01.png'));
        assets.bean.sprites.idle.push(p5.loadImage('assets/sprites/bean/idle_02.png'));
        assets.bean.sprites.idle.push(p5.loadImage('assets/sprites/bean/idle_03.png'));
    }

    p5.setup = function () {
        const canvas = p5.createCanvas(gameSize().width, gameSize().height);
        canvas.parent('game');
        scoreBoard = new ScoreBoard(p5);

        bean = new Bean(p5, assets.bean);
        subscribers = new Subscribers(p5, speed, assets.subscriber);

        spam = new Spam(p5, speed / 2, assets.spam);
    }

    p5.draw = function () {
        p5.background('#eaeff1');

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (subscribers.getPos() < 0) {
            if (speed < maxSpeed) {
                speed += 0.7;
            }

            subscribers = new Subscribers(p5, speed, assets.subscriber);
        } else {
            subscribers.show();
        }

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (spam.getPos() < -200) {
            if (spam.speed < maxSpeed) {
                spam.speed += 0.7;
            }

            spam = new Spam(p5, spam.speed, assets.spam);
        } else {
            spam.update();
        }

        bean.update();

        scoreBoard.update();

        subscribers.checkCollisions(bean.pos);
        spam.checkCollision(bean.pos);

        if (bean.dead && bean.toIdle <= 0) {
            p5.noLoop();
        }
    }

    // Handle stop event
    gameEvents.stop = () => {
        bean.death();
    }

    // Handle window resize
    window.onresize = (e: UIEvent) => {
        p5.resizeCanvas(gameSize().width, gameSize().height);
        bean.spawn();
    }
}
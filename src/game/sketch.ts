import type P5 from "p5";
import 'p5/lib/addons/p5.sound';
import { Bean } from './objects/bean';
import { ScoreBoard } from "./ui/score";
import { Subscribers } from "./objects/subscribers";
import { gameEvents, gameSize } from "./shared/utils";
import { Spam } from './objects/spam';
import { Background } from "./objects/background";

export const sketch = function (p5: P5) {
    let bean: Bean;
    let spam: Spam;
    let background: Background;
    let subscribers: Subscribers;
    let scoreBoard: ScoreBoard;
    let assets: any = {
        bean: {
            sounds: {
                subscribe: null,
                unsubscribe: null
            },
            sprites: {
                idle: [],
                unsubscribed: null,
                jump: null
            }
        },
        spam: {
            sprite: null
        },
        subscriber: {
            sprite: null
        },
        background: {
            sprite: null
        }
    };
    let speed = 8;
    let maxSpeed = 14;
    let play = false;

    async function loadAssets() {
        console.log("preload started");
        const loaders = [];

        // @ts-ignore Wrong parameter format on ts type
        p5.soundFormats('ogg', 'mp3');
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sounds.subscribe = p5.loadSound('assets/sound/subscribe.ogg', resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sounds.unsubscribe = p5.loadSound('assets/sound/unsubscribe.ogg', resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sprites.unsubscribed = p5.loadImage('assets/sprites/bean/hit.png', resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sprites.jump = p5.loadImage('assets/sprites/bean/jump.png', resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.spam.sprite = p5.loadImage('assets/sprites/spam.png', resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.subscriber.sprite = p5.loadImage('assets/sprites/subscriber.png', resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.background.sprite = p5.loadImage('assets/sprites/background.png', resolve, reject);
        }));
        for (let i = 1; i <= 3; i++) {
            loaders.push(new Promise((resolve, reject) => {
                assets.bean.sprites.idle.push(p5.loadImage(`assets/sprites/bean/idle_0${i}.png`, resolve, reject));
            }));
        }

        return Promise.all(loaders);
    }

    p5.setup = function () {
        p5.noLoop();
        loadAssets().then(() => {
            const canvas = p5.createCanvas(gameSize().width, gameSize().height);
            canvas.parent('game');

            document.getElementById('preloader').classList.add('hidden');

            scoreBoard = new ScoreBoard(p5);

            bean = new Bean(p5, assets.bean);
            subscribers = new Subscribers(p5, speed, assets.subscriber);

            spam = new Spam(p5, speed / 2, assets.spam);
            background = new Background(p5, speed / 2, assets.background);
            p5.loop();
            play = true;
        });
    }

    p5.draw = function () {
        if (!play) return;
        background.update();

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
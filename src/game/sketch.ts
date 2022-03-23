import type P5 from "p5";
import 'p5/lib/addons/p5.sound';
import { Bean } from './objects/bean';
import { ScoreBoard } from "./ui/score";
import { Subscribers } from "./objects/subscribers";
import { gameEvents } from "./shared/utils";
import { Spam } from './objects/spam';
import { Background } from "./objects/background";
import { Game, KStates } from "./ui/game";

const basePath = 'https://sandbox.bmartins.dev/flappy';

export const sketch = function (p5: P5) {
    let element: HTMLElement;
    let bean: Bean;
    let spam: Spam;
    let background: Background;
    let game: Game;
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
                subscribe: null,
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
        },
        ui: {
            sprites: {
                life: null
            }
        }
    };

    p5.setup = function () {
        p5.noLoop();
        element = document.querySelector('flappy-goi').shadowRoot.querySelector('#game');

        // Prevent right click on safari
        element.oncontextmenu = (event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };

        game = new Game(p5);
        loadAssets().then(() => {
            p5.createCanvas(element.offsetWidth, element.offsetHeight);
            document.querySelector('flappy-goi').shadowRoot.querySelector('#preloader').remove();

            p5.imageMode(p5.CENTER);

            scoreBoard = new ScoreBoard(p5, assets.ui.sprites.life, assets.subscriber.sprite);

            bean = new Bean(p5, assets.bean);
            subscribers = new Subscribers(p5, game.speed.subscribers.current, assets.subscriber);

            spam = new Spam(p5, game.speed.spam.current, assets.spam);
            background = new Background(p5, assets.background);
            p5.loop();
            game.setState(KStates.START);
        });
    }

    p5.draw = function () {
        switch (game.getState()) {
            case KStates.LOADING:
                return;
            case KStates.START:
                game.renderStartScreen(background, bean);
                break;
            case KStates.END:
                game.renderRestartScreen(background, scoreBoard, bean);
                break;
            case KStates.RUNNING:
                renderGame();
                break;
        }
    }

    // Handle stop event
    gameEvents.stop = () => {
        bean.death();
    }

    // Handle window resize
    window.onresize = (e: UIEvent) => {
        p5.resizeCanvas(element.offsetWidth, element.offsetHeight);
        bean.spawn();
    }

    // Render game
    function renderGame() {
        background.update();

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (subscribers.getPos() < 0) {
            if (game.speed.subscribers.current < game.speed.subscribers.max) {
                game.speed.subscribers.current += game.speed.subscribers.inc;
            }

            subscribers = new Subscribers(p5, game.speed.subscribers.current, assets.subscriber);
        } else {
            subscribers.show();
        }

        // If subscribers is off the screen, replace with new one.
        // Else draw
        if (spam.getPos() < -200) {
            if (game.speed.spam.current < game.speed.spam.max) {
                game.speed.spam.current += game.speed.spam.inc;
            }

            spam = new Spam(p5, game.speed.spam.current, assets.spam);
        } else {
            spam.update();
        }

        bean.update();

        scoreBoard.update();

        // Don't check collision if player is dead
        if (!bean.dead) {
            subscribers.checkCollisions(bean.pos);
            spam.checkCollision(bean.pos);
        }

        // If death animation ended, set END state
        if (bean.dead && bean.toIdle <= 0) {
            game.setState(KStates.END);
        }
    }

    async function loadAssets() {
        const loaders = [];

        // @ts-ignore Wrong parameter format on ts type
        p5.soundFormats('ogg', 'mp3');
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sounds.subscribe = p5.loadSound(`${basePath}/assets/sound/subscribe.ogg`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sounds.unsubscribe = p5.loadSound(`${basePath}/assets/sound/unsubscribe.ogg`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sprites.unsubscribed = p5.loadImage(`${basePath}/assets/sprites/bean/hit.png`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sprites.subscribe = p5.loadImage(`${basePath}/assets/sprites/bean/eat.png`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.bean.sprites.jump = p5.loadImage(`${basePath}/assets/sprites/bean/jump.png`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.spam.sprite = p5.loadImage(`${basePath}/assets/sprites/spam.png`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.ui.sprites.life = p5.loadImage(`${basePath}/assets/sprites/life.png`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.subscriber.sprite = p5.loadImage(`${basePath}/assets/sprites/subscriber.png`, resolve, reject);
        }));
        loaders.push(new Promise((resolve, reject) => {
            assets.background.sprite = p5.loadImage(`${basePath}/assets/sprites/background.png`, resolve, reject);
        }));
        for (let i = 1; i <= 3; i++) {
            loaders.push(new Promise((resolve, reject) => {
                assets.bean.sprites.idle.push(p5.loadImage(`${basePath}/assets/sprites/bean/idle_0${i}.png`, resolve, reject));
            }));
        }

        return Promise.all(loaders);
    }
}
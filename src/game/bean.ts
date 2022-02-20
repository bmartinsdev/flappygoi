import type P5 from "p5";
import { Vector } from "p5";
import { gameEvents } from "./utils";

export enum KBeanActions {
    JUMP,
    SUBSCRIBED,
    UNSUBSCRIBED,
    IDLE
}

export class Bean {
    p5: P5;
    height = 80;
    width = 60;
    pos: P5.Vector;
    assets;
    state: KBeanActions = KBeanActions.IDLE;
    toIdle = 0;

    lifting = false;

    gravity = 0.5;
    velocity = 0;
    thrust = -0.8;
    maxVelocity = 3;

    constructor(p5: P5, assets) {
        this.p5 = p5;
        this.assets = assets;
        this.spawn();
        this.subscribe();
    }

    subscribe() {
        gameEvents.beanActions = (type: KBeanActions) => {
            this.state = type;
            this.toIdle = 5;
            switch (this.state) {
                case KBeanActions.JUMP:
                    break;
                case KBeanActions.SUBSCRIBED:
                    this.assets.sounds.subscribe.play();
                    break;
                case KBeanActions.UNSUBSCRIBED:
                    break;
            }
        };
    }

    spawn() {
        this.pos = new Vector(this.p5.width / 4, this.p5.height / 4);
    }

    show() {
        this.p5.noStroke();
        if (this.toIdle < 0) this.state = KBeanActions.IDLE;

        switch (this.state) {
            case KBeanActions.IDLE:
                this.p5.fill('#04afdb');
                break;
            case KBeanActions.JUMP:
                this.p5.fill('#95a4ff');
                break;
            case KBeanActions.SUBSCRIBED:
                this.p5.fill('#95e1ff');
                break;
            case KBeanActions.UNSUBSCRIBED:
                this.p5.fill('#ff9595');
                break;
        }
        this.p5.ellipse(this.pos.x, this.pos.y, this.width, this.height);
        this.toIdle--;
    }

    update() {
        this.velocity += this.gravity;
        this.pos.y += this.velocity;

        if (this.pos.y > this.p5.height + this.playerBoundary() - this.height) {
            this.pos.y = this.p5.height + this.playerBoundary() - this.height;
            this.velocity = 0;
        }
        if (this.pos.y < this.playerBoundary()) {
            this.pos.y = this.playerBoundary();
            this.velocity = 0;
        }
        if (this.p5.mouseIsPressed) {
            this.lift();
        }
        this.show();
    }

    playerBoundary() {
        return this.height / 2
    }

    lift() {
        if (!(this.state in [KBeanActions.SUBSCRIBED, KBeanActions.UNSUBSCRIBED])) {
            this.state = KBeanActions.JUMP;
            this.toIdle = 10;
        }
        this.velocity += this.thrust;
    }
}
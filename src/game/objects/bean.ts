import type P5 from "p5";
import { Vector } from "p5";
import { Sprite } from "../shared/sprite";
import { gameEvents } from "../shared/utils";

export enum KBeanActions {
    JUMP,
    SUBSCRIBED,
    UNSUBSCRIBED,
    IDLE
}

export class Bean {
    p5: P5;
    height = 80;
    width = 56;
    pos: P5.Vector;
    idleAnimation: Sprite;
    jumpAnimation: P5.Image;
    unsubscribedAnimation: P5.Image;
    subscribedAnimation: P5.Image;
    assets;
    state: KBeanActions = KBeanActions.IDLE;
    toIdle = 0;

    lifting = false;
    dead = false;

    gravity = 0.5;
    velocity = 0;
    thrust = -0.8;
    maxVelocity = 3;

    constructor(p5: P5, assets) {
        this.p5 = p5;
        this.assets = assets;
        this.spawn();
        this.subscribe();
        this.idleAnimation = new Sprite(assets.sprites.idle, this.p5, this.width, this.height);
        this.subscribedAnimation = assets.sprites.subscribe;
        this.jumpAnimation = assets.sprites.jump;
        this.unsubscribedAnimation = assets.sprites.unsubscribed;
    }

    subscribe() {
        gameEvents.beanActions = (type: KBeanActions) => {
            if (this.dead) return;
            this.state = type;
            switch (this.state) {
                case KBeanActions.SUBSCRIBED:
                    this.assets.sounds.subscribe.play();
                    this.toIdle = 10;
                    break;
                case KBeanActions.UNSUBSCRIBED:
                    this.assets.sounds.unsubscribe.play();
                    this.toIdle = 30;
                    break;
            }
        };
    }

    spawn() {
        this.state = KBeanActions.IDLE;
        this.dead = false;
        this.pos = new Vector(-100, this.p5.height);
    }

    show() {
        this.p5.noStroke();
        if (!this.toIdle && !this.dead) this.state = KBeanActions.IDLE;

        switch (this.state) {
            case KBeanActions.IDLE:
                this.idleAnimation.play(this.pos);
                break;
            case KBeanActions.SUBSCRIBED:
                this.p5.image(this.subscribedAnimation, this.pos.x, this.pos.y, this.width, this.height);
                break;
            case KBeanActions.JUMP:
                this.p5.image(this.jumpAnimation, this.pos.x, this.pos.y, this.width, this.height);
                break;
            case KBeanActions.UNSUBSCRIBED:
                this.p5.image(this.unsubscribedAnimation, this.pos.x, this.pos.y, this.width, this.height);
                break;
        }
        this.toIdle--;
    }

    update() {
        this.velocity += this.gravity;
        this.pos.y += this.velocity;
        if (this.pos.x < this.p5.width / 5) {
            this.pos.x += this.maxVelocity;
        }

        if (this.pos.y > this.p5.height + this.playerBoundary() - this.height) {
            this.pos.y = this.p5.height + this.playerBoundary() - this.height;
            this.velocity = 0;
        }
        if (this.pos.y < this.playerBoundary()) {
            this.pos.y = this.playerBoundary();
            this.velocity = 0;
        }
        if (!this.dead) {
            if (this.p5.mouseIsPressed || this.p5.keyIsDown(87)) {
                this.lift();
            }
        }
        this.show();
    }

    playerBoundary() {
        return this.height / 2
    }

    death() {
        this.dead = true;
        this.state = KBeanActions.UNSUBSCRIBED;
        this.toIdle = 50;
    }

    lift() {
        // In operator doesn't work with enums
        if (this.state === KBeanActions.IDLE || this.state === KBeanActions.JUMP) {
            this.toIdle = 10;
            this.state = KBeanActions.JUMP;
        }
        this.velocity += this.thrust;
    }
}
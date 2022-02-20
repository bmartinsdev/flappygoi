import P5, { Vector } from "p5";
import { gameEvents, randomNumberBetween } from "../shared/utils";
import { KBeanActions } from "./bean";

enum Orientation {
    UP = 'up',
    DOWN = 'down'
};
export class Spam {
    p5: P5;
    height = 40;
    width = 40;
    pos: P5.Vector;
    hit = false;
    color = '#d55454';
    zigZagInterval = 0;
    spamAnimation: P5.Image;
    direction = {
        interval: this.zigZagInterval,
        orientation: Orientation.UP
    }
    speed = 0.3;

    constructor(p5: P5, speed: number, assets) {
        this.p5 = p5;
        this.pos = new Vector(p5.width + 100, randomNumberBetween(140, p5.height - 280));
        this.speed = speed;
        this.zigZagInterval = randomNumberBetween(50, 150);
        this.spamAnimation = assets.sprite;
    }

    show() {
        if (!this.hit) {
            this.p5.image(this.spamAnimation, this.pos.x, this.pos.y);
        }
    }

    update() {
        this.pos.x -= this.speed;

        if (this.direction.interval < 0) {
            this.direction.orientation = this.direction.orientation === Orientation.UP ? Orientation.DOWN : Orientation.UP;
            this.direction.interval = this.zigZagInterval;
        }

        this.pos.y += this.direction.orientation === Orientation.UP ? 1 : -1;
        this.direction.interval--;

        this.show();
    }

    getPos() {
        return this.pos.x;
    }

    checkCollision(targetPos: P5.Vector): Boolean {
        if (!this.hit && P5.Vector.dist(this.pos, targetPos) < 45) {
            this.hit = true;
            gameEvents.beanActions(KBeanActions.UNSUBSCRIBED);
            gameEvents.updateLives(-1);
            return true;
        }

        return false;
    }
}
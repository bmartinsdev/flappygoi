import P5, { Vector } from "p5";
import { gameEvents, randomNumberBetween } from "./utils";

enum Orientation {
    UP = 'up',
    DOWN = 'down'
};
export class Spam {
    p5: P5;
    height = 40;
    width = 30;
    pos: P5.Vector;
    hit = false;
    color = '#d55454';
    zigZagInterval = 0;
    direction = {
        interval: this.zigZagInterval,
        orientation: Orientation.UP
    }
    speed = 0.3;

    constructor(p5: P5, speed: number) {
        this.p5 = p5;
        this.pos = new Vector(p5.width + 100, randomNumberBetween(140, p5.height - 280));
        this.speed = speed;
        this.zigZagInterval = randomNumberBetween(50, 150);
    }

    show() {
        if (!this.hit) {
            this.p5.noStroke();
            this.p5.fill(this.color);
            this.p5.ellipse(this.pos.x, this.pos.y, this.width, this.height);
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
            gameEvents.updateLives(-1);
            return true;
        }

        return false;
    }
}
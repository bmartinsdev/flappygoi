import type P5 from "p5";
import { Vector } from "p5";
export class Bean {
    p5: P5;
    height = 80;
    width = 60;
    pos: P5.Vector;

    lifting = false;

    gravity = 0.5;
    velocity = 0;
    thrust = -0.8;
    maxVelocity = 3;

    constructor(p5: P5) {
        this.p5 = p5;
        this.spawn();
    }

    spawn() {
        this.pos = new Vector(window.innerHeight / 4, window.innerWidth / 2);
    }

    show() {
        this.p5.noStroke();
        this.p5.fill('#04afdb');
        this.p5.ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    update() {
        this.velocity += this.gravity;
        this.pos.y += this.velocity;

        if (this.pos.y > window.innerHeight + this.playerBoundary() - this.height) {
            this.pos.y = window.innerHeight + this.playerBoundary() - this.height;
            this.velocity = 0;
        }
        if (this.pos.y < this.playerBoundary()) {
            this.pos.y = this.playerBoundary();
            this.velocity = 0;
        }
        if (this.p5.mouseIsPressed) {
            this.lift();
        }
    }

    playerBoundary() {
        return this.height / 2
    }

    lift() {
        this.velocity += this.thrust;
    }
}
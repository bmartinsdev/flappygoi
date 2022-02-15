import type P5 from "p5";
export class Bean {
    p5: P5;
    height = 80;
    width = 60;
    y: number;
    x: number;

    lifting = false;

    gravity = 0.3;
    velocity = 0;
    thrust = -1;

    constructor(p5: P5) {
        this.p5 = p5;
        this.spawn();
    }

    spawn() {
        this.y = window.innerHeight / 2;
        this.x = window.innerWidth / 4;
    }

    show() {
        this.p5.noStroke();
        this.p5.fill('#04afdb');
        this.p5.ellipse(this.x, this.y, this.width, this.height);
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > window.innerHeight - this.playerBoundary()) {
            this.y = window.innerHeight - this.playerBoundary();
            this.velocity = 0;
        }
        if (this.y <= this.playerBoundary()) {
            this.y = this.playerBoundary();
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
        console.log(this.velocity);
    }
}
import type P5 from "p5";
export class Subscriber {
    p5: P5;
    height = 30;
    width = 30;
    y: number;
    x: number;
    triggered: false;

    speed = 2;

    constructor(p5: P5, x: number, y: number, speed: number) {
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    show() {
        this.p5.noStroke();
        this.p5.fill('#000000');
        this.p5.ellipse(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
    }
}
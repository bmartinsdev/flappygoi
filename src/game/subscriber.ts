import P5, { Vector } from "p5";
export class Subscriber {
    p5: P5;
    height = 30;
    width = 30;
    pos: P5.Vector;
    triggered: false;
    color = '#000000';

    speed = 2;

    constructor(p5: P5, x: number, y: number, speed: number) {
        this.p5 = p5;
        this.pos = new Vector(x, y);
        this.speed = speed;
    }

    show() {
        this.p5.noStroke();
        this.p5.fill(this.color);
        this.p5.ellipse(this.pos.x, this.pos.y, this.width, this.height);
    }

    update() {
        this.pos.x -= this.speed;
    }

    hits(targetPos: P5.Vector): Boolean {
        return P5.Vector.dist(this.pos, targetPos) < 60;
    }

    destroy() {
        this.color = 'grey';
    }
}
import P5, { Vector } from "p5";
export class Subscriber {
    p5: P5;
    height = 30;
    width = 30;
    pos: P5.Vector;
    subscriberAnimation: P5.Image;
    hit = false;
    color = '#000000';

    speed = 2;

    constructor(p5: P5, x: number, y: number, speed: number, assets) {
        this.p5 = p5;
        this.pos = new Vector(x, y);
        this.speed = speed;
        this.subscriberAnimation = assets.sprite;
    }

    show() {
        if (!this.hit) {
            this.p5.image(this.subscriberAnimation, this.pos.x, this.pos.y);
        }
    }

    update() {
        this.pos.x -= this.speed;
    }

    hits(targetPos: P5.Vector): Boolean {
        if (!this.hit && P5.Vector.dist(this.pos, targetPos) < 30) {
            this.hit = true;
            return true;
        }

        return false;
    }
}
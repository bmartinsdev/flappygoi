import type P5 from "p5";
export class Sprite {
    p5;
    speed = 0.2;
    index = 0;
    animation;
    length;

    constructor(animation: P5.Image[], p5: P5) {
        this.animation = animation;
        this.length = this.animation.length;
        this.p5 = p5;
    }

    play(pos: P5.Vector) {
        this.index += this.speed;
        const index = Math.floor(this.index);

        this.p5.image(this.animation[index], pos.x, pos.y);
        if (index == this.animation.length - 1) {
            this.index = 0;
        }
    }
}
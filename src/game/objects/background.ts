import type P5 from "p5";

export class Background {
    p5: P5;
    backgroundAnimation: P5.Image;
    x: number = 0;
    speed = 0.3;
    height = () => this.p5.height / 1.4;
    width: number;

    constructor(p5: P5, speed: number, assets) {
        this.p5 = p5;
        this.speed = speed;
        this.width = 1800;
        this.backgroundAnimation = assets.sprite;
    }

    show() {
        // Clear canvas
        this.p5.background('#e1e6e8');

        // Draw background on half screen to complete png
        this.p5.fill('#f4f8fa');
        this.p5.rect(0, 0, this.p5.width, this.height());

        // Draw two background images stitched together
        this.p5.image(this.backgroundAnimation, this.x, this.height(), this.width);
        this.p5.image(this.backgroundAnimation, this.x + this.width, this.height(), this.width);
        this.p5.image(this.backgroundAnimation, this.x + this.width * 2, this.height(), this.width);
    }

    update() {
        this.x -= this.speed;

        if (Math.abs(this.x) > this.width) {
            this.x = 0;
        }

        this.show();
    }
}
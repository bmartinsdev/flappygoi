import type P5 from "p5";
import { Subscriber } from "./subscriber";
const clusterCount = 10;
export class Subscribers {
    p5: P5;
    subscribers: Subscriber[] = [];
    speed: number;
    x = window.innerWidth + 100;

    constructor(p5: P5, speed) {
        this.p5 = p5;
        this.speed = speed;
        const randomY = Math.floor(Math.random() * ((window.innerHeight - 140) - 140 + 1) + 140);
        if (Math.random() < 0.5) {
            this.spawnLine(randomY)
        } else {
            if (randomY < window.innerHeight / 2) {
                this.spawnUpperArc(randomY);
            } else {
                this.spawnLowerArc(randomY);
            }
        }
    }

    spawnLine(randomY): void {
        for (let i = 0; i < clusterCount; i++) {
            this.subscribers.push(new Subscriber(this.p5, this.x + 60 * i, randomY, this.speed));
        }
    }

    spawnUpperArc(randomY): void {
        for (let i = 0; i < clusterCount; i++) {
            this.subscribers.push(new Subscriber(this.p5, this.x + 60 * i, randomY, this.speed));
            randomY = randomY - 20 + i * 2;
        }
    }

    spawnLowerArc(randomY): void {
        for (let i = 0; i < clusterCount; i++) {
            this.subscribers.push(new Subscriber(this.p5, this.x + 60 * i, randomY, this.speed));
            randomY = randomY + 20 - i * 2;
        }
    }

    getPos(): number {
        return this.subscribers[this.subscribers.length - 1].pos.x;
    }

    show() {
        for (const subscriber of this.subscribers) {
            subscriber.show();
            subscriber.update();
        }
    }

    checkCollisions(pos: P5.Vector) {
        for (const subscriber of this.subscribers) {
            if (subscriber.hits(pos)) {
                subscriber.destroy();
            }
        }
    }
}
import P5 from "p5";
import { gameEvents } from "./utils";
export class ScoreBoard {
    p5: P5;
    score: number;

    constructor(p5: P5) {
        this.p5 = p5;
        this.score = 0;
        this.subscribe();
    }

    subscribe() {
        gameEvents.updateScore = (points: number) => {
            this.score += points;
        };
    }

    draw() {
        this.p5.textSize(20);
        this.p5.fill("#000");
        this.p5.text(this.score, this.p5.width - 80, 80);
    }

    update() {
        this.draw();
    }
}
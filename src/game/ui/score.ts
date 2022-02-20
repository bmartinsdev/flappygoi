import type P5 from "p5";
import { gameEvents } from "../shared/utils";
export class ScoreBoard {
    p5: P5;
    score: number;
    lives = 3;

    constructor(p5: P5) {
        this.p5 = p5;
        this.score = 0;
        this.subscribe();
    }

    subscribe() {
        gameEvents.updateScore = (points: number) => {
            this.score += points;
        };
        gameEvents.updateLives = (life: number) => {
            this.lives += life;
            if (this.lives === 0) this.p5.noLoop();
        }
    }

    draw() {
        this.p5.textSize(20);
        this.p5.fill("#000");
        this.p5.textAlign(this.p5.RIGHT);
        this.p5.text(`${this.score} pts`, this.p5.width - 30, 80);
        this.p5.text(`${this.lives} lives`, this.p5.width - 30, 60);
    }

    update() {
        this.draw();
    }
}
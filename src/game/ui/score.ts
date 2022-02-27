import type P5 from "p5";
import { gameEvents } from "../shared/utils";
export class ScoreBoard {
    p5: P5;
    score;
    highestScore = 0;
    lives;
    plays = 0;

    constructor(p5: P5) {
        this.p5 = p5;
        this.reset();
        this.subscribe();
    }

    reset() {
        this.plays++;
        this.score = 0;
        this.lives = 3;
    }

    subscribe() {
        gameEvents.updateScore = (points: number) => {
            this.score += points;
        };
        gameEvents.updateLives = (life: number) => {
            this.lives += life;
            if (this.lives === 0) {
                if (this.score > this.highestScore) {
                    this.highestScore = this.score;
                }
                gameEvents.stop();
            }
        }
    }

    draw() {
        this.p5.textSize(20);
        this.p5.fill("#000");
        this.p5.textAlign(this.p5.RIGHT);
        this.p5.text(`${this.score} subs`, this.p5.width - 30, 80);
        this.p5.text(`${this.lives} lives`, this.p5.width - 30, 60);
    }

    update() {
        this.draw();
    }
}
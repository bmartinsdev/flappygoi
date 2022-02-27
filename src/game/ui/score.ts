import type P5 from "p5";
import { gameEvents } from "../shared/utils";
export class ScoreBoard {
    p5: P5;
    score;
    highestScore = 0;
    lives;
    livesSprite: P5.Image;
    subsSprite: P5.Image;
    plays = 0;

    constructor(p5: P5, livesSprite, subsSprite) {
        this.p5 = p5;
        this.livesSprite = livesSprite;
        this.subsSprite = subsSprite;
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
        this.p5.text(this.score, this.p5.width - 50, 40);
        this.p5.image(this.subsSprite, this.p5.width - 30, 30, 20, 20);
        if (this.lives) {
            for (let i = 1; i <= this.lives; i++) {
                this.p5.image(this.livesSprite, this.p5.width - (35 * i), 70, 30, 30);
            }
        }
    }

    update() {
        this.draw();
    }
}
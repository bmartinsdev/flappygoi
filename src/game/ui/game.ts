import type P5 from "p5";
import type { Background } from "../objects/background";
import type { Bean } from "../objects/bean";
import type { ScoreBoard } from "./score";

export enum KStates {
    LOADING,
    RUNNING,
    START,
    END
}

export class Game {
    p5: P5;
    state: KStates;
    delay;
    speed: any;

    constructor(p5: P5) {
        this.p5 = p5;
        this.state = KStates.LOADING;
        this.resetSpeed();
    }

    setState(state: KStates) {
        this.state = state;
        this.delay = 50;
    }

    getState(): KStates {
        return this.state;
    }

    resetSpeed() {
        this.speed = {
            spam: {
                current: 4,
                max: 12,
                inc: 1
            },
            subscribers: {
                current: 8,
                max: 16,
                inc: 0.7
            }
        }
    }

    renderStartScreen(background: Background, bean: Bean) {
        // Clear canvas
        this.p5.background('#e1e6e8');

        background.update();

        bean.update();
        this.p5.textSize(20);
        this.p5.fill("#CCCCCC90");
        this.p5.textAlign(this.p5.CENTER);
        this.p5.text('TAP TO PLAY', this.p5.width / 2, this.p5.height / 2);
        if (this.delay < 0 && (this.p5.mouseIsPressed || this.p5.keyIsDown(this.p5.UP_ARROW))) {
            this.state = KStates.RUNNING;
        }
        this.delay--;
    }

    renderRestartScreen(background: Background, score: ScoreBoard, bean: Bean) {
        // Clear canvas
        this.p5.background('#e1e6e8');

        background.update();
        bean.update();
        this.p5.textSize(20);
        this.p5.fill("#CCCCCC90");
        this.p5.textAlign(this.p5.CENTER);
        this.p5.text('TAP TO RESTART', this.p5.width / 2, this.p5.height / 2 + 45);
        this.p5.textSize(50);
        this.p5.fill("#04afdb");
        this.p5.text(score.score, this.p5.width / 2, this.p5.height / 2);
        if (this.delay < 0 && (this.p5.mouseIsPressed || this.p5.keyIsDown(this.p5.UP_ARROW))) {
            this.resetSpeed();
            score.reset();
            bean.spawn();
            this.state = KStates.RUNNING;
        }
        this.delay--;
    }
}
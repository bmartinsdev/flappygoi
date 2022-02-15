import type P5 from "p5";
import { Bean } from './Bean';
export const sketch = (p5: P5) => {
    let bean: Bean;
    p5.setup = () => {
        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent('game');
        bean = new Bean(p5);
    }

    p5.draw = () => {
        p5.background('#eaeff1');
        bean.show();
        bean.update();
    }
}
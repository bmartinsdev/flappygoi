
export const gameSize = () => {
    const width = window.innerWidth;
    let height = window.innerHeight;

    if (height > width * 1.2) {
        height = 600;
    }
    return {
        height,
        width
    }
};

class Subject {
    updateScore: CallableFunction;
}
export const gameEvents = new Subject();
class Subject {
    stop: CallableFunction;
    updateScore: CallableFunction;
    updateLives: CallableFunction;
    beanActions: CallableFunction;
}
export const gameEvents = new Subject();

export const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max + 1) + min)
}

export const randomBoolean = () => Math.random() < 0.5;
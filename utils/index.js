import { config } from '../tests/config';

const wait = ms => {
    return new Promise(resolve => setTimeout(resolve, Math.round(ms * config.speed)));
};

export { wait };

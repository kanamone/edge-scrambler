type Scrambler = {
    scramble: (n: number) => number;
    restore: (n: number) => number;
};
export declare function create(digits: number, n1: number, n2: number, seed: number, stages: number): Scrambler;
export {};

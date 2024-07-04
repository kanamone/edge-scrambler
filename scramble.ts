type Scramble = (n: number) => number

export function create(
    digits: number,
    n1: number,
    n2: number,
    seed: number,
    stages: number,
): Scramble {
    const ar = <T>(length: number, fn: (i: number) => T): T[] =>
        new Array(length).fill(0).map((_, i) => fn(i)),
    gt = (length: number, stages: number, seed: number): number[][] => {
        let y = seed
        return ar(stages, () =>
            ar(length, () => ((y ^= y << 13), (y ^= y >> 17), (y ^= y << 5)))
                .map((n, i) => [n, i])
                .sort((a, b) => a[0] - b[0])
                .map((a) => a[1]),
        )
    },
    sp = (n: number, digits: number): number[] => {
        const d = n.toString().split('').map(Number)
        while (d.length < digits) d.unshift(0)
        return d
    },
    jn = (digits: number[]) => Number(digits.join('')),
    sw = (digits: number[], table: number[]) =>
        digits
            .map((c, i) => [table[i], c])
            .sort((a, b) => a[0] - b[0])
            .map((a) => a[1]),
    sl = (digits: number[], table: number[], multiplier: number) =>
        digits.map((c, i) => (c + (table[i] % 10) * multiplier + 10) % 10),
    mod = 10 ** digits,
    tables = gt(digits, stages, seed)

    if ((n1 * n2) % mod !== 1) {
        throw new Error('invalid number pair')
    }

    return (n) => {
        let m = n
        for (let i = 0; i < stages; i++)
            m = jn(sl(sw(sp((m * n1) % mod, digits), tables[i]), tables[i], 1))
        return m
    }
}

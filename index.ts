type Scrambler = {
    scramble: (n: number) => number
    restore: (n: number) => number
}

export function create(
    digits: number,
    n1: number,
    n2: number,
    seed: number,
    stages: number,
): Scrambler {
    const array = <T>(length: number, fn: (i: number) => T): T[] =>
            new Array(length).fill(0).map((_, i) => fn(i)),
        // generateTables
        gt = (length: number, stages: number, seed: number): number[][] => {
            let y = seed
            return array(stages, () =>
                array(length, () => ((y ^= y << 13), (y ^= y >> 17), (y ^= y << 5)))
                    .map((n, i) => [n, i])
                    .sort((a, b) => a[0] - b[0])
                    .map((a) => a[1]),
            )
        },
        // splitDigits
        sp = (n: number, digits: number): number[] => {
            const d = n.toString().split('').map(Number)
            while (d.length < digits) d.unshift(0)
            return d
        },
        // joinDigits
        jn = (digits: number[]) => Number(digits.join('')),
        // swapDigits
        sw = (digits: number[], table: number[]) => {
            const result = Array(digits.length)
            for (let i = 0; i < digits.length; i++)
                result[table[i]] = digits[i]
            return result
        },
        // slideDigits
        sl = (digits: number[], table: number[], multiplier: number) => {
            const result = Array(digits.length)
            for (let i = 0; i < digits.length; i++)
                result[i] = (digits[i] + (table[i] % 10) * multiplier + 10) % 10
            return result
        },
        // restoreSwapDigits
        rs = (data: number[], table: number[]): number[] => {
            const result = Array(data.length)
            for (let i = 0; i < data.length; i++) {
                result[table.indexOf(i)] = data[i]
            }
            return result
        },
        mod = 10 ** digits,
        tables = gt(digits, stages, seed)

    if ((n1 * n2) % mod !== 1) {
        throw new Error('invalid number pair')
    }

    const buffer = new Array(digits)

    return {
        scramble(n): number {
            let m = n
            for (let i = 0; i < stages; i++) {
                const table = tables[i]
                m = jn(sl(sw(sp((m * n1) % mod, digits), table), table, 1))
            }
            return m
        },
        restore(n): number {
            let m = n
            for (let i = stages - 1; i >= 0; i--) {
                const table = tables[i]
                m = (jn(rs(sl(sp(m, digits), table, -1), table)) * n2) % mod
            }
            return m
        },
    }
}

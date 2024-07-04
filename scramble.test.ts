import { create } from "./scramble";

describe('scramble', () => {
    it('should 9999 numbers should be unique', () => {
        const digits = 4
        const n1 = 1101
        const n2 = 8901
        const seed = 123456789
        const stages = 10

        const scramble = create(digits, n1, n2, seed, stages)

        const scrambled = new Set<number>()

        for (let i = 0; i < 10000; i++) {
            scrambled.add(scramble(i))
        }

        expect(scrambled.size).toBe(10000)
    })
})

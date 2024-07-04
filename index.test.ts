import { create } from "./index";

describe('scrambler', () => {
    it('should scramble and restore a number', () => {
        const digits = 6
        const n1 = 138361
        const n2 = 855241
        const seed = 123456789
        const stages = 10

        const s = create(digits, n1, n2, seed, stages)

        const n = 1234

        const scrambled = s.scramble(n)

        expect(scrambled).not.toBe(n)

        const restored = s.restore(scrambled)

        expect(restored).toBe(n)
    })

    it('should scramble and restore a max number', () => {
        const digits = 6
        const n1 = 138361
        const n2 = 855241
        const seed = 123456789
        const stages = 4

        const s = create(digits, n1, n2, seed, stages)

        const n = 999999

        const scrambled = s.scramble(n)

        expect(scrambled).not.toBe(n)

        const restored = s.restore(scrambled)

        expect(restored).toBe(n)
    })

    it('should 9999 numbers should be unique', () => {
        const digits = 4
        const n1 = 1101
        const n2 = 8901
        const seed = 123456789
        const stages = 10

        const s = create(digits, n1, n2, seed, stages)

        const scrambled = new Set<number>()

        for (let i = 0; i < 10000; i++) {
            scrambled.add(s.scramble(i))
        }

        expect(scrambled.size).toBe(10000)
    })
})

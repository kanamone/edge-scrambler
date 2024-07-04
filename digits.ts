const table = [1, 4, 3, 0, 2]
const data = [1, 2, 3, 4, 5]

const swapDigits = (digits: number[], table: number[]) => {
    const result = Array(digits.length) as number[]
    for (let i = 0; i < digits.length; i++)
        result[table[i]] = digits[i]
    return result
}

const swapped = swapDigits(data, table)
console.log(swapped) // [4, 1, 5, 3, 2]

const restoreSwapDigits = (data: number[], table: number[]): number[] => {
    const result = Array(data.length)
    for (let i = 0; i < data.length; i++) {
        result[table.indexOf(i)] = data[i]
    }
    return result
}

console.log(restoreSwapDigits(swapped, table)) // [1, 2, 3, 4, 5]

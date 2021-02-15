/**
 * Generate random number
 * @param {Number} min 
 * @param {Number} max 
 */
Number.prototype.randomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * Generate a set of random numbers. e.g. -(4,42,6)-> 4 8 15 16 23 42 
 * @param {Number} min 
 * @param {Number} max 
 * @param {Number} length 
 * @return {Array.Number} set of numbers
 */
Number.prototype.randomComboIntInclusive = function (min, max, length = 1) {
    let numbers = []
    for (let j = 0; j < length; j++) {
        numbers.push((0).randomIntInclusive(min, max))
    }
    return numbers
}
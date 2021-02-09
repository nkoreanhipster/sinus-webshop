/**
 * 
 * @param {Array} params 
 */
export const addDuplicateCountProperty = (arr) => {
    for (let item of arr) {
        let countOfDuplicates = arr.filter(x => x._id == item._id).length
        item.countOfDuplicates = countOfDuplicates
    }
}

export const removeDuplicatesFromArray = (arr) => {
    const seen = new Set();
    const filteredArr = arr.filter(el => {
        const duplicate = seen.has(el._id);
        seen.add(el._id);
        return !duplicate;
    });
    return filteredArr
}
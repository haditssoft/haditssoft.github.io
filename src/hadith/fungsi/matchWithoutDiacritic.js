const matchWithoutDiacritic = (word) => {
    let arrayOfEachChar = word.split('');
    let stringToBeRegex = arrayOfEachChar.join('[\u064B-\u0652]*');
    let diacriticRegEx = new RegExp('(' + stringToBeRegex + '[\u064B-\u0652]*)', 'g');
    return diacriticRegEx;
};

export default matchWithoutDiacritic;
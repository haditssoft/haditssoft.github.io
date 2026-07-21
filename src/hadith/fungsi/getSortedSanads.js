
const getSomeValueFromArray = (sourceArray, wantedIndex, whichData) => {
    switch (whichData) {
      case 'mainArray':
        return sourceArray.filter((obj, index) => !wantedIndex.includes(index));
      default:
        return sourceArray.filter((obj, index) => wantedIndex.includes(index)); 
    };
};

const getSortedSanads = (abjad, narrators, indexOfShahabah) => {
    let sortedArray = [];
    // the arrayLengthOfRawiNames.length will be use for index position
    // where "sanad should be moved" will be moved
    // important to put this code before or outside map of abjad
    let arrayLengthOfRawiNames = []; // example of result of arrayToBeChecked.map() will be: ['aisyah']
    let arrayToBeChecked = [];
    let usedArray = null;
    let rawisNameToTheVeryLeft = '';
    let indexDoesNotExist = [];
    let indexShouldExist = 0;
    const totalShahabah = {};
    // let indexOfShahabah = 0;

    abjad.map((item, idx) => {
        arrayToBeChecked = [];

        usedArray = sortedArray.length === 0 ? narrators : sortedArray;
        
        usedArray.map((itemObject, indx) => {
            if (arrayLengthOfRawiNames.length === 0 || indx < arrayLengthOfRawiNames.length + indexOfShahabah) {
                if (itemObject['Nama' + item] !== null) {
                    // buat array nama rawi secara row bukan column
                    // example: ['aisyah', 'aisyah', 'jabir']
                    arrayToBeChecked.push(itemObject['Nama' + item]);
                    // ambil nama rawi paling kiri
                    if (indx === indexOfShahabah) {
                        rawisNameToTheVeryLeft = itemObject['Nama' + item];
                    };
                };
            };
        });
        
        if (idx === 0) {
            arrayToBeChecked.forEach(function(i) {
            totalShahabah[i] = (totalShahabah[i] || 0) + 1; 
            });
        };

        // empty the arrayLengthOfRawiNames before filled it with new rawi's name
        arrayLengthOfRawiNames = [];
        // if indexDoesNotExist.length !== 0 it means there is sanad which needs to be moved
        indexDoesNotExist = [];
        indexShouldExist = 0;
        // Gunakan arrayToBeChecked untuk pencarian index bisa dengan .map()
        // ['aisyah', 'aisyah', 'jabir']
        arrayToBeChecked.map((name, indx) => {
            if (name === rawisNameToTheVeryLeft) {
                // ['aisyah', 'aisyah']
                arrayLengthOfRawiNames.push(name);
                indexShouldExist += 1;
            } else {
                if (indexShouldExist !== indx + 1) {
                    if (indx > indexOfShahabah) {
                        // if after jabir ['aisyah', 'aisyah', 'jabir'] there is still 'aisyah'
                        // then save the index of jabir otherwise don't
                        if (arrayToBeChecked.lastIndexOf(rawisNameToTheVeryLeft) > indx) {
                            indexDoesNotExist.push(indx);
                        };
                    };
                    indexShouldExist += 1;
                };
            };
        });
        
        // perform moving sanad
        if (indexDoesNotExist.length !== 0) {
            // narrators need to be modified
            if (arrayToBeChecked.length !== usedArray.length) { // means arrayToBeChecked.length < narrators.length
                // should divide the array into two pieces first
                // then insert "the sanad should be moved" in the midle of it
                let mainArray = getSomeValueFromArray(sortedArray.length === 0 ? narrators : sortedArray, indexDoesNotExist, 'mainArray');
                const movedArray = getSomeValueFromArray(sortedArray.length === 0 ? narrators : sortedArray, indexDoesNotExist, 'movedArray');
                movedArray.map((obj, ix) => {
                    mainArray.splice((arrayLengthOfRawiNames.length + ix), 0, obj);
                });
                sortedArray = mainArray;
            } else {
                // could just use spread operator or .push()
                let mainArray = getSomeValueFromArray(sortedArray.length === 0 ? narrators : sortedArray, indexDoesNotExist, 'mainArray');
                const movedArray = getSomeValueFromArray(sortedArray.length === 0 ? narrators : sortedArray, indexDoesNotExist, 'movedArray');
                sortedArray = [...mainArray, ...movedArray];
            };
        } else {
            // if sortedArray is empty then use narrators as are
            // because none has been modified
            if (sortedArray.length === 0) {
                sortedArray = narrators;
            };
        };
    });

    return [sortedArray, totalShahabah]; // [[array], {object}]
};

export default getSortedSanads;
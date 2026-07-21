const getKitabName = (kitabsNameAndNumber) => {
    // replace di JS hanya satu jadi gunakan regex /g global;
    // return kitab's name without white space
    return kitabsNameAndNumber.replace(/[\s'\d+]/g, '');
};

export default getKitabName;
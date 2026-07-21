export let isSizeSmall = false;
export let currentSizeId = '';

const setCurrentScreenSize = (isSmall, id) => {
    isSizeSmall = isSmall;
    currentSizeId = id;
}

export default setCurrentScreenSize;
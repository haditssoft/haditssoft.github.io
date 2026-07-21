// import Store from 'electron-store';
import getKitabName from './getKitabName';
import * as book from '../store/kitabsName';

const getNoteName = (kitab) => {
    return getKitabName(kitab) + "Note";
};

export default getNoteName;
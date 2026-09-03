import { SEARCHDATA } from '../store/action';
import * as kit from '../store/kitabsName';
import arrayOfKitabsName from '../store/arrayOfKitabsName';
import sender from '../sender/senderDataRequest';

const checkFlags = [
  { idx: 2, name: kit.SHAHIHBUKHARI },
  { idx: 4, name: kit.SHAHIHMUSLIM },
  { idx: 6, name: kit.SUNANTIRMIDZI },
  { idx: 8, name: kit.SUNANABUDAUD },
  { idx: 10, name: kit.SUNANNASAI },
  { idx: 12, name: kit.SUNANIBNUMAJAH },
  { idx: 14, name: kit.SUNANDARIMI },
  { idx: 16, name: kit.MUSNADAHMAD },
  { idx: 18, name: kit.MUWATHAMALIK },
  { idx: 20, name: kit.SUNANDARUQUTHNI },
  { idx: 22, name: kit.SHAHIHIBNUKHUZAIMAH },
  { idx: 24, name: kit.SHAHIHIBNUHIBBAN },
  { idx: 26, name: kit.ALMUSTADRAK },
  { idx: 28, name: kit.MUSNADSYAFII }
];

// always search across all checked books (all-books mode) in a single request
const executeRequest = (arr) => {
  if (arr[0] === 'continue') {
    // all-books mode on continue: the single request already covered everything
    if (arr[29].length !== 0) {
      const numberToBeShown = arr[36];
      const indexToBeShown = numberToBeShown - 1;
      if (arr[29][indexToBeShown]) {
        const keyOfNum = Object.keys(arr[29][indexToBeShown])[0];
        const numToKitabName = arrayOfKitabsName[keyOfNum];
        sender('loadCustomData',
        [numToKitabName,
          Object.values(arr[29][indexToBeShown])[0],
          numberToBeShown,
          SEARCHDATA]);
      }
    }
    arr[30]('');
    if (arr[31] !== false && arr[31] !== null ||
      arr[32] !== false && arr[32] !== null) {
      arr[33]([false, false]);
    }
    if (arr[38]) arr[38]();
    return;
  }
  // start: collect checked books and send one all-books request
  const books = checkFlags.filter(f => arr[f.idx] === true).map(f => f.name);
  if (books.length) {
    sender('searchHaditsAll', [arr[34], null, { keyword: arr[35], books: books }]);
  } else {
    const numberToBeShown = arr[36];
    const indexToBeShown = numberToBeShown - 1;
    if (arr[29].length !== 0 && arr[29][indexToBeShown]) {
      const keyOfNum = Object.keys(arr[29][indexToBeShown])[0];
      const numToKitabName = arrayOfKitabsName[keyOfNum];
      sender('loadCustomData',
      [numToKitabName,
        Object.values(arr[29][indexToBeShown])[0],
        numberToBeShown,
        SEARCHDATA]);
    }
    arr[30]('');
    if (arr[31] !== false && arr[31] !== null ||
      arr[32] !== false && arr[32] !== null) {
      arr[33]([false, false]);
    }
    if (arr[38]) arr[38]();
  }
};

export default executeRequest;

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

const executeRequest = (arr) => {
  let name;
  // start sending request
  if (arr[0] === 'start' && arr[37] === 1) {
    // all-books mode: collect checked books and send one request
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
    return;
  }
  if (arr[0] === 'continue' && arr[37] === 1) {
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
  if (arr[0] === 'continue') {
    if (arr[1] === '' && arr[2] === true) {
      name = kit.SHAHIHBUKHARI;
    } else if (arr[3] === '' && arr[4] === true) {
      name = kit.SHAHIHMUSLIM;
    } else if (arr[5] === '' && arr[6] === true) {
      name = kit.SUNANTIRMIDZI;
    } else if (arr[7] === '' && arr[8] === true) {
      name = kit.SUNANABUDAUD;
    } else if (arr[9] === '' && arr[10] === true) {
      name = kit.SUNANNASAI;
    } else if (arr[11] === '' && arr[12] === true) {
      name = kit.SUNANIBNUMAJAH;
    } else if (arr[13] === '' && arr[14] === true) {
      name = kit.SUNANDARIMI;
    } else if (arr[15] === '' && arr[16] === true) {
      name = kit.MUSNADAHMAD;
    } else if (arr[17] === '' && arr[18] === true) {
      name = kit.MUWATHAMALIK;
    } else if (arr[19] === '' && arr[20] === true) {
      name = kit.SUNANDARUQUTHNI;
    } else if (arr[21] === '' && arr[22] === true) {
      name = kit.SHAHIHIBNUKHUZAIMAH;
    } else if (arr[23] === '' && arr[24] === true) {
      name = kit.SHAHIHIBNUHIBBAN;
    } else if (arr[25] === '' && arr[26] === true) {
      name = kit.ALMUSTADRAK;
    } else if (arr[27] === '' && arr[28] === true) {
      name = kit.MUSNADSYAFII;
    } else {
      // entering this chamber means the end of searching
      if (arr[29].length !== 0) {
        // send request only if there is at least a result of search (not null)
        const numberToBeShown = arr[36]; // nomer urutan hadith dari hasil pencarian yg harus di tampilkan
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
      // set state current shown table name
      arr[30]('');
      // collapse the opened panel in kedudukan or in tema
      if (arr[31] !== false && arr[31] !== null ||
        arr[32] !== false && arr[32] !== null) {
        arr[33]([false, false]);
      }
      if (arr[38]) arr[38]();
      return; // return if there is no more book to search, very important
    }
  } else {
    if (arr[2] === true) {
      name = kit.SHAHIHBUKHARI;
    } else if (arr[4] === true) {
      name = kit.SHAHIHMUSLIM;
    } else if (arr[6] === true) {
      name = kit.SUNANTIRMIDZI;
    } else if (arr[8] === true) {
      name = kit.SUNANABUDAUD;
    } else if (arr[10] === true) {
      name = kit.SUNANNASAI;
    } else if (arr[12] === true) {
      name = kit.SUNANIBNUMAJAH;
    } else if (arr[14] === true) {
      name = kit.SUNANDARIMI;
    } else if (arr[16] === true) {
      name = kit.MUSNADAHMAD;
    } else if (arr[18] === true) {
      name = kit.MUWATHAMALIK;
    } else if (arr[20] === true) {
      name = kit.SUNANDARUQUTHNI;
    } else if (arr[22] === true) {
      name = kit.SHAHIHIBNUKHUZAIMAH;
    } else if (arr[24] === true) {
      name = kit.SHAHIHIBNUHIBBAN;
    } else if (arr[26] === true) {
      name = kit.ALMUSTADRAK;
    } else if (arr[28] === true) {
      name = kit.MUSNADSYAFII;
    } else {
      // entering this chamber means the end of searching
      if (arr[29].length !== 0) {
        // send request only if there is at least a result of search (not null)
        const numberToBeShown = arr[36]; // nomer urutan hadith dari hasil pencarian yg harus di tampilkan
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
      // set state current shown table name
      arr[30]('');
      // collapse the opened panel in kedudukan or in tema
      if (arr[31] !== false && arr[31] !== null ||
        arr[32] !== false && arr[32] !== null) {
        arr[33]([false, false]);
      }
      if (arr[38]) arr[38]();
      return; // return if there is no more book to search, very important
    }
  }

  sender('searchHadits', [name, arr[34], arr[35]]);
};

export default executeRequest;
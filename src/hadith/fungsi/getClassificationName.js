export const getCompactClassName = (class_name) => {
    switch (class_name) {
        case 'KumpulanAlQuran':
          return 'alquran';
        case 'KumpulanQudsi':
          return 'qudsi';
        case 'KumpulanMutawatir':
          return 'mutawatir';
        case 'KumpulanMarfu':
          return 'marfu';
        case 'KumpulanMauquf':
          return 'mauquf';
        case 'KumpulanMaqthu':
          return 'maqthu';
        case 'KumpulanMursal':
          return 'mursal';
        case 'KumpulanMunqathi':
          return 'munqathi';
        case 'KumpulanMuallaq':
          return 'muallaq';
          
        case 'TemaIman':
          return 'iman';
        case 'TemaIlmu':
          return 'ilmu';
        case 'TemaUmat':
          return 'umat';
        case 'TemaPerjalanan':
          return 'perjalanan';
        case 'TemaAlQuran':
          return 'quran';
        case 'TemaAkhlaq':
          return 'akhlaq';
        case 'TemaIbadah':
          return 'ibadah';
        case 'TemaMakanan':
          return 'makanan';
        case 'TemaPakaian':
          return 'pakaian';
        case 'TemaKepribadian':
          return 'kepribadian';
        case 'TemaMuamalah':
          return 'muamalah';
        case 'TemaHukum':
          return 'hukum';
        case 'TemaKriminalitas':
          return 'kriminalitas';
        case 'TemaJihad':
          return 'jihad';

        default:
          break;
    }
  };
  
  const getClassFullName = (subUrl) => {
      switch (subUrl) {
        case 'alquran':
          return 'KumpulanAlQuran';
        case 'qudsi':
          return 'KumpulanQudsi';
        case 'mutawatir':
          return 'KumpulanMutawatir';
        case 'marfu':
          return 'KumpulanMarfu';
        case 'mauquf':
          return 'KumpulanMauquf';
        case 'maqthu':
          return 'KumpulanMaqthu';
        case 'mursal':
          return 'KumpulanMursal';
        case 'munqathi':
          return 'KumpulanMunqathi';
        case 'muallaq':
          return 'KumpulanMuallaq';

        case 'iman':
          return 'TemaIman';
        case 'ilmu':
          return 'TemaIlmu';
        case 'umat':
          return 'TemaUmat';
        case 'perjalanan':
          return 'TemaPerjalanan';
        case 'quran':
          return 'TemaAlQuran';
        case 'akhlaq':
          return 'TemaAkhlaq';
        case 'ibadah':
          return 'TemaIbadah';
        case 'makanan':
          return 'TemaMakanan';
        case 'pakaian':
          return 'TemaPakaian';
        case 'kepribadian':
          return 'TemaKepribadian';
        case 'muamalah':
          return 'TemaMuamalah';
        case 'hukum':
          return 'TemaHukum';
        case 'kriminalitas':
          return 'TemaKriminalitas';
        case 'jihad':
          return 'TemaJihad';

        default:
          break;
      }
  };
  
    export default getClassFullName;
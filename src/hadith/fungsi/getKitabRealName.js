export const getCompactKitabRealName = (subUrl) => {
  switch (subUrl) {
    case 'bukhari':
      return 'ShahihBukhari'; 
    case 'muslim':
      return 'ShahihMuslim'; 
    case 'tirmidzi':
      return 'SunanTirmidzi'; 
    case 'abudaud':
      return 'SunanAbuDaud'; 
    case 'nasai':
      return 'SunanNasai'; 
    case 'ibnumajah':
      return 'SunanIbnuMajah'; 
    case 'darimi':
      return 'SunanDarimi'; 
    case 'ahmad':
      return 'MusnadAhmad'; 
    case 'malik':
      return 'MuwathaMalik'; 
    case 'daruquthni':
      return 'SunanDaruquthni'; 
    case 'ibnukhuzaimah':
      return 'ShahihIbnuKhuzaimah'; 
    case 'ibnuhibban':
      return 'ShahihIbnuHibban'; 
    case 'mustadrak':
      return 'AlMustadrak'; 
    case 'syafii':
      return 'MusnadSyafii'; 
    default:
      break;
  }
};

const getKitabRealName = (confName) => {
    switch (confName) {
      case 'bukharinote':
        return 'Shahih Bukhari'; 
      case 'muslimnote':
        return 'Shahih Muslim'; 
      case 'tirmidzinote':
        return 'Sunan Tirmidzi'; 
      case 'abudaudnote':
        return 'Sunan Abu Daud'; 
      case 'nasainote':
        return 'Sunan Nasa\'i'; 
      case 'ibnumajahnote':
        return 'Sunan Ibnu Majah'; 
      case 'dariminote':
        return 'Sunan Darimi'; 
      case 'ahmadnote':
        return 'Musnad Ahmad'; 
      case 'maliknote':
        return 'Muwatha\' Malik'; 
      case 'daruquthninote':
        return 'Sunan Daruquthni'; 
      case 'ibnukhuzaimahnote':
        return 'Shahih Ibnu Khuzaimah'; 
      case 'ibnuhibbannote':
        return 'Shahih Ibnu Hibban'; 
      case 'mustadraknote':
        return 'Al Mustadrak'; 
      case 'syafiinote':
        return 'Musnad Syafi\'i'; 
      default:
        break;
    }
};

  export default getKitabRealName;
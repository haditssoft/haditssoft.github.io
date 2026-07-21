import * as kitabsName from '../store/kitabsName';

const getCompleteKitabName = (partOfName) => {
    switch (partOfName) {
        case 'Bukhari':
            return kitabsName.SHAHIHBUKHARI;
        case 'Muslim':
            return kitabsName.SHAHIHMUSLIM;
        case 'Tirmidzi':
            return kitabsName.SUNANTIRMIDZI;
        case 'Abu Daud':
            return kitabsName.SUNANABUDAUD;
        case 'Nasa\'i':
            return kitabsName.SUNANNASAI;
        case 'Ibnu Majah':
            return kitabsName.SUNANIBNUMAJAH;
        case 'Darimi':
            return kitabsName.SUNANDARIMI;
        case 'Ahmad':
            return kitabsName.MUSNADAHMAD;
        case 'Malik':
            return kitabsName.MUWATHAMALIK;
        case 'Daruquthni':
            return kitabsName.SUNANDARUQUTHNI;
        case 'Ibnu Khuzaimah':
            return kitabsName.SHAHIHIBNUKHUZAIMAH;
        case 'Ibnu Hibban':
            return kitabsName.SHAHIHIBNUHIBBAN;
        case 'Al Hakim':
            return kitabsName.ALMUSTADRAK;
        case 'Syafi\'i':
            return kitabsName.MUSNADSYAFII;
        default:
            return undefined;
    }
};

export default getCompleteKitabName;
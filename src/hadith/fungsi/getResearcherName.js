import * as KitabsName from '../store/kitabsName';

const getResearcherName = (kitabName) => {
    // First off, get rid the number and the white space
    // const kitabName = getKitabName(kitabNameNumber);
    
    switch (kitabName) {
        case KitabsName.SHAHIHBUKHARI:
            return ['Ijma\' Ulama', '-', 'Shahih'];
        case KitabsName.SHAHIHMUSLIM:
            return ['Ijma\' Ulama', '-', 'Shahih'];
        case KitabsName.SUNANTIRMIDZI:
            return ['M. Nashiruddin Al Albani', 'Abu Thahir Zubair \'Ali Zai'];
        case KitabsName.SUNANABUDAUD:
            return ['M. Nashiruddin Al Albani', 'Abu Thahir Zubair \'Ali Zai'];
        case KitabsName.SUNANNASAI:
            return ['M. Nashiruddin Al Albani', 'Abu Thahir Zubair \'Ali Zai'];
        case KitabsName.SUNANIBNUMAJAH:
            return ['M. Nashiruddin Al Albani', 'Abu Thahir Zubair \'Ali Zai'];
        case KitabsName.SUNANDARIMI:
            return ['Husain Salim Asad Ad Daroni', '-'];
        case KitabsName.MUSNADAHMAD:
            return ['Syu\'aib Al Arnauth', 'Ahmad Syakir'];
        case KitabsName.MUWATHAMALIK:
            return ['Salim bin \'Id Al Hilali', '-'];
        case KitabsName.SUNANDARUQUTHNI:
            return ['Majdi bin Manshur bin Sayyid', '-'];
        case KitabsName.SHAHIHIBNUKHUZAIMAH:
            return ['M. Nashiruddin Al Albani', 'Al A\'dhomi'];
        case KitabsName.SHAHIHIBNUHIBBAN:
            return ['M. Nashiruddin Al Albani', 'Syu\'aib Al Arnauth'];
        case KitabsName.ALMUSTADRAK:
            return ['Adz Dzahabi', '-'];
        case KitabsName.MUSNADSYAFII:
            return ['-', '-'];
        default:
            return ['', ''];
    };
};

export default getResearcherName;
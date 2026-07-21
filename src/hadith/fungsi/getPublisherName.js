import getKitabName from './getKitabName';
import * as KitabsName from '../store/kitabsName';
import { currentSizeId } from '../store/currentScreenSize';

const getPublisherName = (kitabNameNumber) => {
    // First off, get rid the number and the white space
    const kitabName = getKitabName(kitabNameNumber);

    const isXS = (currentSizeId === 'xs');

    switch (kitabName) {
        case KitabsName.SHAHIHBUKHARI:
            return 'Fathul Bari:';
        case KitabsName.SHAHIHMUSLIM:
            return (isXS ? 'Syarh S. Muslim:' : 'Syarh Shahih Muslim:');
        case KitabsName.SUNANTIRMIDZI:
            return (isXS ? 'M. Al Ma\'arif:' : 'Maktabah Al Ma\'arif:');
        case KitabsName.SUNANABUDAUD:
            return (isXS ? 'Baitul Afkar:' : 'Baitul Afkar Ad Dauliah:');
        case KitabsName.SUNANNASAI:
            return (isXS ? 'M. Al Ma\'arif:' : 'Maktabah Al Ma\'arif:');
        case KitabsName.SUNANIBNUMAJAH:
            return (isXS ? 'M. Al Ma\'arif:' : 'Maktabah Al Ma\'arif:');
        case KitabsName.SUNANDARIMI:
            return 'Darul Mughni:';
        case KitabsName.MUSNADAHMAD:
            return (isXS ? 'M. Ar Risalah:' : 'Muassasah Ar Risalah:');
        case KitabsName.MUWATHAMALIK:
            return 'Darul Ma\'rifah:';
        case KitabsName.SUNANDARUQUTHNI:
            return (isXS ? 'M. Ar Risalah:' : 'Muassasah Ar Risalah:');
        case KitabsName.SHAHIHIBNUKHUZAIMAH:
            return '-:';
        case KitabsName.SHAHIHIBNUHIBBAN:
            return '-:';
        case KitabsName.ALMUSTADRAK:
            return '-:';
        case KitabsName.MUSNADSYAFII:
            return '-:';
        default:
            return 'No Lain:';
    }
};

export default getPublisherName;
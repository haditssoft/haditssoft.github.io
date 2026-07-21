export const getCompactImamName = (text) => {
    let imamName = '';
    if (text.includes('Bukhari')) {
        imamName = 'bukhari';
    } else if (text.includes('Muslim')) {
        imamName = 'muslim';
    } else if (text.includes('Tirmidzi')) {
        imamName = 'tirmidzi';
    } else if (text.includes('Daud')) {
        imamName = 'abudaud';
    } else if (text.includes('Nasa')) {
        imamName = 'nasai';
    } else if (text.includes('Majah')) {
        imamName = 'ibnumajah';
    } else if (text.includes('Darimi')) {
        imamName = 'darimi';
    } else if (text.includes('Ahmad')) {
        imamName = 'ahmad';
    } else if (text.includes('Malik')) {
        imamName = 'malik';
    } else if (text.includes('Daruquth')) {
        imamName = 'daruquthni';
    } else if (text.includes('Khuza')) {
        imamName = 'ibnukhuzaimah';
    } else if (text.includes('Hibban')) {
        imamName = 'ibnuhibban';
    } else if (text.includes('Mustadrak')) {
        imamName = 'alhakim';
    } else if (text.includes('Syafi')) {
        imamName = 'syafii';
    } else {
        imamName = 'bukhari';
    };
    return imamName;
};

const getImamName = (text) => {
    let imamName = '';
    if (text.includes('Bukhari')) {
        imamName = 'Bukhari';
    } else if (text.includes('Muslim')) {
        imamName = 'Muslim';
    } else if (text.includes('Tirmidzi')) {
        imamName = 'Tirmidzi';
    } else if (text.includes('Daud')) {
        imamName = 'Abu Daud';
    } else if (text.includes('Nasa')) {
        imamName = 'Nasa\'i';
    } else if (text.includes('Majah')) {
        imamName = 'Ibnu Majah';
    } else if (text.includes('Darimi')) {
        imamName = 'Darimi';
    } else if (text.includes('Ahmad')) {
        imamName = 'Ahmad';
    } else if (text.includes('Malik')) {
        imamName = 'Malik';
    } else if (text.includes('Daruquth')) {
        imamName = 'Daruquthni';
    } else if (text.includes('Khuza')) {
        imamName = 'Ibnu Khuzaimah';
    } else if (text.includes('Hibban')) {
        imamName = 'Ibnu Hibban';
    } else if (text.includes('Mustadrak')) {
        imamName = 'Al Hakim';
    } else if (text.includes('Syafi')) {
        imamName = 'Syafi\'i';
    } else {
        imamName = 'Bukhari';
    };
    return imamName;
};

export default getImamName;
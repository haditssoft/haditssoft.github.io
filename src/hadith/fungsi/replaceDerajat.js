const replaceDerajat = (number) => {
    switch (number) {
        case '1':
            return "Shahih";
        case '2':
            return "Shahihul Isnad";
        case '3':
            return "Hasan Shahih";
        case '4':
            return "Hasan";
        case '5':
            return "Hasanul Isnad";
        case '6':
            return "Dha'if";
        case '7':
            return "Dha'iful Isnad";
        case '8':
            return "Dha'if Jiddan";
        case '9':
            return "Munkar";
        case '10':
            return "Maudhu'";
        case '11':
            return "Syadz";
        case '12':
            return "Shahih Bima Qablahu";
        case '13':
            return "Hasan Bima Qblahu";
        default:
            return number;
    };
};

export default replaceDerajat;
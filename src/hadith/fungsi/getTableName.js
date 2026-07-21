import * as total from '../store/totalHaditsEachBook';
import {
    SHAHIHBUKHARI,
    SHAHIHMUSLIM,
    SUNANTIRMIDZI,
    SUNANABUDAUD,
    SUNANNASAI,
    SUNANIBNUMAJAH,
    SUNANDARIMI,
    MUSNADAHMAD,
    MUWATHAMALIK
} from '../store/kitabsName';

export const getMainTable_Kedudukan = (position, table) => {

    if (position <= total[table][0]) {
        return SHAHIHBUKHARI;
    } else if (position > total[table][0] && position <= (total[table][0] + total[table][1])) {
        return SHAHIHMUSLIM;
    } else if (position > (total[table][0] + total[table][1]) && position <= (total[table][0] + total[table][1] + total[table][2])) {
        return SUNANTIRMIDZI;
    } else if (position > (total[table][0] + total[table][1] + total[table][2]) && position <= (total[table][0] + total[table][1] + total[table][2] + total[table][3])) {
        return SUNANABUDAUD;
    } else if (position > (total[table][0] + total[table][1] + total[table][2] + total[table][3]) && position <= (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4])) {
        return SUNANNASAI;
    } else if (position > (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4]) && position <= (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5])) {
        return SUNANIBNUMAJAH;
    } else if (position > (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5]) && position <= (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5] + total[table][6])) {
        return SUNANDARIMI;
    } else if (position > (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5] + total[table][6]) && position <= (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5] + total[table][6] + total[table][7])) {
        return MUSNADAHMAD;
    } else if (position > (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5] + total[table][6] + total[table][7]) && position <= (total[table][0] + total[table][1] + total[table][2] + total[table][3] + total[table][4] + total[table][5] + total[table][6] + total[table][7] + total[table][8])) {
        return MUWATHAMALIK;
    };
};

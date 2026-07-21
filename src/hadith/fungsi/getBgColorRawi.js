import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';

import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';

import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';

import deepOrange from '@material-ui/core/colors/deepOrange';

import brown from '@material-ui/core/colors/brown';

import grey from '@material-ui/core/colors/grey';

const getBgColorRawi = (level) => {
    switch (level) {
        case 1:
            return cyan['A200'];
        case 2:
            return lightGreen['A400'];
        case 3:
            return blue;
        case 4:
            return green;
        case 5:
            return purple;
        case 6:
            return teal;
        case 7:
            return deepPurple;
        case 8:
            return yellow['A200'];
        case 9:
            return pink;
        case 10:
            return brown;
        case 11:
            return deepOrange;
        case 12:
            return red['A700'];
        default:
            return grey[50];
    };
};

export default getBgColorRawi;
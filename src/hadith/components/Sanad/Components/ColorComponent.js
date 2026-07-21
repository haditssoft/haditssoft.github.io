import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ColorLensIcons from '@material-ui/icons/ColorLens';

import getBgColorRawi from '../../../fungsi/getBgColorRawi';
import ColorExplanation from './ColorExplanation';
import TableHeader from './ColorCompItem/TableHeader';
import TableCellBody from './ColorCompItem/TableCellBody';


const ColoredIcon = (level) => {
    const BgColor = getBgColorRawi(level);
    return <ColorLensIcons style={{ color: typeof BgColor !== 'string' ? BgColor[500] : BgColor }} />;
};

const abjad = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const itemList = [
    ['1', ColoredIcon(1), 'Shahabat'],
    ['2', ColoredIcon(2), 'Tsiqah Hafizh'],
    ['3', ColoredIcon(3), 'Tsiqah \'Adil'],
    ['4', ColoredIcon(4), 'Shaduuq la ba\'sa bih'],
    ['5', ColoredIcon(5), 'Buruk Hafalannya'],
    ['6', ColoredIcon(6), 'Maqbul'],
    ['7', ColoredIcon(7), 'Majhul Hal'],
    ['8', ColoredIcon(8), 'Dha\'if'],
    ['9', ColoredIcon(9), 'Tidak Dipercaya / Majhul'],
    ['10', ColoredIcon(10), 'Matruk'],
    ['11', ColoredIcon(11), 'Tertuduh Berdusta'],
    ['12', ColoredIcon(12), 'Kadzab (Pendusta)'],
];

function ColorComponent(props) {
    const { narrator, sanadPosition } = props;
    
    return (
        <React.Fragment>
            <Table size="small">
                <TableHeader />
                <TableBody>
                    {itemList.map((item, idx) => {
                        // bold any text according to current level of narrators
                        let fontThick = '';
                        abjad.map(elm => {
                            if (narrator[sanadPosition]['Quality' + elm] == item[0]) {
                                fontThick = 'bold';
                            };
                        });
                        // bold any text according to current level of narrators
                        return (
                            <TableCellBody
                                key={idx}
                                item={item}
                                idx={idx}
                                fontThick={fontThick}
                            />
                        )
                    })}
                </TableBody>
            </Table>
            <ColorExplanation />
        </React.Fragment>
    );
};

export default React.memo(ColorComponent);
import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { SELECTEDEXPLANATION, EXPLANATIONCOLOR } from '../../../../store/action';


const styles = theme => ({
    setCursor: {
        cursor: 'pointer',
        '&$selected': {
            backgroundColor: theme.palette.action.selected
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    selected: {},
});

const StyledCellBody = withStyles(theme => ({
    body: {
        fontSize: 12,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 16,
        '&:last-child': {
            paddingRight: 6,
        },
        borderBottom: theme.palette.type === 'dark' ? 'none' : `1px solid ${theme.palette.divider}`,
    },
}))(TableCell);

const explanationText = [
    '',
    'Sahabat ialah orang yang bertemu rasulullah shallallahu \'alaihi wa salllam dan ia seorang muslim sampai akhir hayatnya.',
    'Tsiqah Tsiqah atau Tsiqah Hafizh ialah perawi yang mempunyai kredibilitas yang tinggi, yang terkumpul pada dirinya sifat adil dan hafalannya sangat kuat.',
    'Tsiqah / Mutqin / \'Adil, ialah perawi yang mempunyai sifat \'adil dan kuat hafalannya.',
    'Shaduq La Ba\'sa Bihi ialah perawi yang jujur terhadap apa yang diberitakan dan perawi tersebut tidak bermasalah (cacat dalam periwayatan).',
    'Shaduq, buruk hafalannya ialah perawi yang jujur terhadap apa yang diberitakan, tetapi ia memiliki hafalan yang buruk dan sering keliru dalam periwayatan.',
    'Maqbul ialah perawi yang diterima periwayatannya dan dapat dijadikan sebagai hujjah.',
    'Majhul Al Haal / Mastur ialah perawi yang tidak diketahui jati dirinya.',
    'Dha\'if ialah perawi yang lemah periwayatannya (lemah/cacat hafalannya, lemah ilmunya, lemah dalam agama).',
    'Majhul ialah perawi yang hanya diriwayatkan oleh satu orang saja.',
    'Matruk ialah perawi yang dituduh berdusta atau perawi yang banyak melakukan kekeliruan, sehingga periwayatannya bertentangan dengan periwayatan perawi yang tsiqah. atau perawi yang sering meriwayatkan hadits-hadits yang tidak dikenal (gharib) dari perawi yang terkenal tsiqah.',
    'Tertuduh berdusta ialah orang yang tertuduh berdusta derajat haditsnya seperti hadits palsu, tetapi tidak dapat dipastikan bahwasanya hadits tersebut hadits palsu, karena kondisi dia yang tertuduh mengakibatkan derajat haditsnya turun mendekati hadits palsu.',
    'Kadzaab (pendusta) ialah perawi yang pendusta, haditsnya tidak bisa dijadikan hujjah.',
];

class TableCellBody extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.item[0] === this.props.selectedExplanation) {
            return true;
        } else if (this.props.item[0] !== nextProps.selectedExplanation) {
            return false;
        };
        return true;
    };

    handleRowClick = rowNumber => () => {
        this.props.onSelectExplanation(rowNumber);
        this.props.onShowExplanationColor(explanationText[rowNumber]);
    };

    render() {
        const { classes, item, idx, fontThick, selectedExplanation } = this.props;
        let firstRowStyle = null;
        if (item[0] === '1') {
            firstRowStyle = { paddingTop: 8 };
        }
        return (
            <TableRow
                classes={{ root: classes.setCursor, selected: classes.selected }}
                key={idx}
                hover
                onClick={this.handleRowClick(item[0])}
                selected={item[0] === selectedExplanation}
            >
                <StyledCellBody style={{ fontWeight: fontThick, ...firstRowStyle }} width="50px" component="th" scope="row">{item[0]}</StyledCellBody>
                <StyledCellBody style={firstRowStyle} width="50px">{item[1]}</StyledCellBody>
                <StyledCellBody style={{ fontWeight: fontThick, ...firstRowStyle }} width="200px">{item[2]}</StyledCellBody>
            </TableRow>
        );
    };
};

const mapStateToProps = state => {
    return {
        selectedExplanation: state.showDetailsColor.selectedExplanation,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectExplanation: (num) => dispatch({ type: SELECTEDEXPLANATION, value: num }),
        onShowExplanationColor: (str) => dispatch({ type: EXPLANATIONCOLOR, value: str })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(TableCellBody)));
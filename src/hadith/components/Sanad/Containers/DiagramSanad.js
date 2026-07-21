import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { SHOWDIAGRAMSANAD } from '../../../store/action';
import PaperName from '../Components/RawiNameItem/PaperName';
import getBgColorRawi from '../../../fungsi/getBgColorRawi';
import getSortedSanads from '../../../fungsi/getSortedSanads';

const styles = theme => ({
  root: {
    userSelect: 'none',
  },
  setDisplayFlex: {
    height: 'fit-content',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
  },
  flexDisplay: {
    display: 'flex',
    paddingBottom: 100,
  },
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      enableUserSelectHack={false}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const abjad = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

class DiagramSanad extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.openDiagramSanad !== nextProps.openDiagramSanad) {
      return true;
    };
    return false;
  };

  handleClose = () => {
    this.props.onShowDiagramSanad(false);
  };

  render() {
    const { classes, openDiagramSanad, kitabName, narrators, fullScreen } = this.props;
    let sortedArray = [];

    if (narrators.length > 2) {
      // sortedArray is an array contain 2 value mainly [modified version of narrators] and {aisyah: 7, jabir: 4}
      sortedArray = getSortedSanads(abjad, narrators, 0); // up until here first portion of sanad has been sorted
      // from here forwards are to sort the rest of sanad
      // which are different in names of shahabahs from the first one
      const shahabahNames = Object.keys(sortedArray[1]); // ['aisyah', 'jabir']
      if (shahabahNames.length > 1) {
        let positionOfShahabah = 0;
        for (let i = 0; i < shahabahNames.length; i++) {
          const el = shahabahNames[i];
          if (i !== 0) { // ignore the first shahabah because it has been successfully modified
            sortedArray = getSortedSanads(abjad, sortedArray[0], positionOfShahabah);
          }
          positionOfShahabah += sortedArray[1][el]; // get the value of shahabah which represent its total of sanads
        }
      }
      // last step just take the modified narrator
      // which is needed in the next process down below
      sortedArray = sortedArray[0];
    } else {
      sortedArray = narrators;
    }

    // block of code below are to put sanads on display after being sorted
    let shouldIgnore = null;

    let lineBoundary = [{column: 0, row: 0}];

    const listOfRawi = sortedArray.map((itemObject, indx) => { // MAP ==========
      
      // seeting to the default value everytime move to the next object of Rawis.
      shouldIgnore = null;

      const rowsOfRawi = abjad.map((item, idx) => { // MAP ============
        if (itemObject['Nama' + item] !== null) {

          // handle coloring
          const BgColor = getBgColorRawi(itemObject['Quality' + item]);
          let coloringStyle = { backgroundColor: typeof BgColor !== 'string' ? BgColor[500] : BgColor };
          if (true) {
            coloringStyle = {
              borderRight: 'solid',
              // borderLeft: 'solid',
              borderRightWidth: 6,
              borderColor: typeof BgColor !== 'string' ? BgColor[500] : BgColor,
              width: 220,
              marginBottom: 8,
            };
          };
          
          // handle line direction by setting its margin
          let lineDirection = null;
          // handle hiding
          let shouldHide = null;
          if (indx > 0) {
            if (shouldIgnore !== indx) {
              if (sortedArray[indx - 1]['Nama' + item] === itemObject['Nama' + item]) {
                shouldHide = {visibility: 'hidden'};
              } else {
                // if a Rawi not to be hidden then all Rawis bellow it should not too
                // this is done by setting "shouldIgnore" equal to index of current object of Rawis
                // so that the later checking condition will meet the criteria to ignore or not to hide
                // the next Rawis.
                shouldIgnore = indx;

                // [{column: 3, row: 3},
                // {column: 2, row: 5},
                // {column: 1, row: 2}
                // {column: 0, row: 0}]
                // the order should be decreasing for the lineBoundary.find to works properly
                // that means those index are the position of first narrators that are not hidden
                // it will be the boundary where the length (to the left) of line should end
                // if the current sanad position (indx) is 3 then the length of line will stop in sanad 1
                // instead of spanning to the sanad 0, and not stop on sanad 2, because the first narrator
                // in sanad 2 is lower than sanad 3 but the first narrator in sanad 1 is higher than sanad 3
                lineBoundary = [{column: indx, row: idx}, ...lineBoundary];
                if (idx !== 0) {
                  const objOfIndexBoundary = lineBoundary.find(obj => obj.row < idx);
                  lineDirection = {
                    marginRight: '49.5%',
                    marginLeft: '-' + (((indx - objOfIndexBoundary.column) * 100) - 49.5) + '%',
                  };
                };
              };

            };
          };
          
          return (
            <PaperName
              lineDirection={lineDirection}
              visible={shouldHide}
              key={new Date().getTime() + idx}
              rawiName={itemObject['Nama' + item]}
              coloringStyle={coloringStyle}
              item={item}
              idx={idx} />
          );
        };
      });
      
      // either 'undefined' or {} (object)
      // if 'undefined' it means there is no component in listOfRawi (array)
      // so dont return or render anything
      const isUndefined = rowsOfRawi.find(elm => typeof elm !== 'undefined');
      if (isUndefined) {
        return (
          <div
            key={new Date().getTime() + indx}
            style={(sortedArray.length - 1) === indx ? {paddingRight: '100px'} : null}
            className={classes.setDisplayFlex}
          >
            {rowsOfRawi}
          </div>
        );
      } else {
        return null;
      };
    });

    return (
      <div>
        <Dialog
          open={openDiagramSanad}
          onClose={this.handleClose}
          PaperComponent={PaperComponent}
          scroll='paper'
          fullWidth={true}
          maxWidth='md'
          fullScreen={fullScreen}
          aria-labelledby='draggable-dialog-title'
        >
          <DialogTitle classes={{ root: classes.root }} id='draggable-dialog-title' onMouseDown={e => e.preventDefault()}>
            {'Sanad ' + kitabName}
          </DialogTitle>
          <DialogContent className={classes.flexDisplay}>
            {listOfRawi}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
};

const mapStateToProps = state => {
    return {
        openDiagramSanad: state.diagramSanad.openDiagramSanad,
        kitabName: state.mainBooksData.KitabName,
        narrators: state.sanadData.narrators,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowDiagramSanad: (booLean) => dispatch({ type: SHOWDIAGRAMSANAD, open: booLean }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(withTheme(DiagramSanad))));

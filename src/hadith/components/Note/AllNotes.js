import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { connect } from 'react-redux';
import ListOfNotes from './ListOfNotes';

const initialExpand = [
    'bukharinote',
    'muslimnote',
    'tirmidzinote',
    'abudaudnote',
    'nasainote',
    'ibnumajahnote',
    'dariminote',
    'ahmadnote',
    'maliknote',
    'daruquthninote',
    'ibnukhuzaimahnote',
    'ibnuhibbannote',
    'mustadraknote',
    'syafiinote',
]; // kitabID

const AllNotes = (props) => {
    // [['bukharinote', '56:bla la bu da hu ca', 'muslimnote', '32:lala baba'], {bukharinote: 1, muslimnote: 1}]
    let { allNotes } = props;

    // without this when show AllNotes first before data stored will fail
    // in web app fetching data need some times
    if (!allNotes.length) {
        allNotes = [[], {}];
    }

    const [open, setOpen] = React.useState(initialExpand);

    const handleExpand = kitabID => () => {
        if (open.includes(kitabID)) {
          let expandAKitab = open.filter(kitabName => kitabName !== kitabID);
          setOpen(expandAKitab);
        } else {
          setOpen([...open, kitabID]);
        };
    };

    // delete note value from allNotes[0]
    // example ['muslimnote', 'its note', 'another note', 'other note']
    // become ['muslimnote']
    let copyOriginalArray = [...allNotes[0]];
    if (open.length) {
        open.map((kitabId, idx) => {
             // index of 'muslimnote'
            const targetIndex = copyOriginalArray.indexOf(kitabId);
            // total number of all of its note value wanted to be deleted
            const deleteCount = allNotes[1][kitabId];
            // perform deletion
            copyOriginalArray.splice(targetIndex + 1, deleteCount);
        })
    }
    
    const totalList = copyOriginalArray.length;
    const mainNoteData = [copyOriginalArray, allNotes[1]];
    
    return (
        <List
            style={{flex: 'auto', height: '-webkit-fill-available'}}
            disablePadding
            component='nav'
            aria-labelledby='all-notes-list-subheader'
            subheader={
            <ListSubheader component='div' id='all-notes-list-subheader'>
                Total: {Object.values(allNotes[1]).reduce((total, num) => total + num, 0)}
            </ListSubheader>
            }
        >
            <AutoSizer>
                {({ height, width }) => {
                    
                    return (
                        <FixedSizeList
                            style={{ overflowX: 'hidden', overflowY: 'scroll' }}
                            height={height - 48}
                            width={width}
                            itemSize={78}
                            itemCount={totalList}
                            itemData={{
                                allNotes: mainNoteData,
                                handleExpand: handleExpand,
                                open: open,
                            }}
                        >
                            {ListOfNotes}
                        </FixedSizeList>
                    );
                }}
            </AutoSizer>
        </List>
    );
};

const mapStateToProps = state => {
    return {
      allNotes: state.AllNotesData.allNotes,
    };
};

export default connect(mapStateToProps)(React.memo(AllNotes));
import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ListOfRawiName from './ListOfRawiName';


function RawiResult({ tabBodyHeight, resultRawiLength, reRenderRawiResult, t }) {

  return (
    <AutoSizer>
      {({ height, width }) => {
        const calcHeight = tabBodyHeight - height - (47 + (reRenderRawiResult / reRenderRawiResult));
        return (
          <List
            style={{width: 'fit-content'}}
            disablePadding
            component='nav'
            aria-labelledby='rawiresult-list-subheader'
            subheader={
              <ListSubheader component='div' id='rawiresult-list-subheader'>
                {t('rawiSearch.result', { count: resultRawiLength })}
              </ListSubheader>
            }
          >
            <FixedSizeList
              height={calcHeight < 0 ? 0 : calcHeight}
              width={width - 1}
              itemSize={68}
              itemCount={resultRawiLength}
            >
              {ListOfRawiName}
            </FixedSizeList>
          </List>
        );
      }}
    </AutoSizer>
  );
};

const mapStateToProps = state => {
  return {
    tabBodyHeight: state.tabBodyHeightRef.tabBodyHeight.clientHeight,
    resultRawiLength: state.resultOfSearchRawi.resultRawi.length,
    reRenderRawiResult: state.rerenderTrigger.reRenderRawiResult,
  };
};

export default withTranslation()(connect(mapStateToProps)(React.memo(RawiResult)));

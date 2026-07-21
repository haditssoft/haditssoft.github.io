import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ComboFont from './ComponentSetting/ComboFont';
import ComboStyle from './ComponentSetting/ComboStyle';
import SlideSize from './ComponentSetting/SlideSize';
// No firebase imports needed
import { switchServer, authFetch } from '../../sender/api';
const useStyles = makeStyles(theme => ({
  root: {
    margin: '24px 8px 0',
    fontWeight: '500',
    color: '#B0B0B0',
    lineHeight: 0
  },
  headTitle: {
    marginLeft: '8px',
    marginTop: '0.35em',
    color: (theme.palette.type === 'light') ? '#757FBF' : '#00AEDB'
  },
  dividerWidth: {
    minWidth: '100%',
    marginLeft: '-8px'
  },
  disableScrollX: {
    overflowX: 'hidden',
    minWidth: 250,
    maxWidth: 250,
    paddingLeft: 8
  }
}));


const FontSettings = (props) => {

  const classes = useStyles();
  const prevFontRef = useRef(null);
  const nextFontRef = useRef(null);

  const getFontSetting = (ar, ind) => {
    if (props.open) {
      prevFontRef.current = [ar, ind];
    } else {
      nextFontRef.current = [ar, ind];
      // check should font setting saved to server
      let arabicKey = '/arabic', indoKey = '/indo';
      let bodyContent;
      // concate arab to be checked
      const concatPrevAr = prevFontRef.current[0].join('');
      const concatNextAr = nextFontRef.current[0].join('');
      // concate indo to be checked
      const concatPrevInd = prevFontRef.current[1].join('');
      const concatNextInd = nextFontRef.current[1].join('');
      // check arab font
      if (concatPrevAr !== concatNextAr) {
        indoKey = '';
        bodyContent = { arabic: nextFontRef.current[0] };
      }
      // check indo font
      if (concatPrevInd !== concatNextInd) {
        arabicKey = '';
        if (!indoKey) {
          bodyContent = { arabic: nextFontRef.current[0], translation: nextFontRef.current[1] };
        } else {
          bodyContent = { translation: nextFontRef.current[1] }; // nextFontRef.current[1];
        }
      }
      if (!bodyContent) {
        // nothing changed
        return;
      }
      const token = localStorage.getItem('token');
      if (token) {
        authFetch(switchServer + 'fonts', {
          method: 'PUT',
          body: JSON.stringify(bodyContent)
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to save font')
            }
          })
          .catch(err => console.log('set font', err));
      }
    }
  }

  return (
    <Drawer
      PaperProps={{
        classes: { root: classes.disableScrollX }
      }}
      anchor="right"
      open={props.open}
      onClose={props.clicked(false)}
    >
      <Typography classes={{ root: classes.headTitle }} gutterBottom variant='h6'>Font Arab</Typography>
      <Typography classes={{ root: classes.root }} variant='body1'>Nama</Typography>
      <ComboFont getFontSetting={getFontSetting} lang='arabic' />
      <Typography classes={{ root: classes.root }} variant='body1'>Jenis</Typography>
      <ComboStyle lang='arabic' />
      <Typography classes={{ root: classes.root }} variant='body1'>Ukuran</Typography>
      <SlideSize lang='arabic' />
      <Divider classes={{ root: classes.dividerWidth }} />
      <Typography classes={{ root: classes.headTitle }} gutterBottom variant='h6'>Font Indonesia</Typography>
      <Typography classes={{ root: classes.root }} variant='body1'>Nama</Typography>
      <ComboFont getFontSetting={getFontSetting} lang='indo' />
      <Typography classes={{ root: classes.root }} variant='body1'>Jenis</Typography>
      <ComboStyle lang='indo' />
      <Typography classes={{ root: classes.root }} variant='body1'>Ukuran</Typography>
      <SlideSize lang='indo' />
    </Drawer>
  );
}

// const mapStateToProps = state => {
//   return {
//     arabicFont: state.fontSetting.arabicFont,
//     indoFont: state.fontSetting.indoFont,
//   };
// };

export default React.memo(FontSettings);

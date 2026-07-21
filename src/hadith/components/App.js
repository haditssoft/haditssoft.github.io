import React from 'react';
import AppBar from "./AppBar";
import ComboBox from "./ComboBox";
import GridBreakPoint from "./GridBreakPoint";
import SnackBars from './SnackBar';
import ArabicKeyboard from './Keyboard/ArabicKeyboard';
import FormNote from './Note/FormNote';
import Biography from './Biography/Biography';
import Info from './Info/Info';
import ProfileRawi from './Sanad/Containers/ProfileRawi';
import DialogProfileRawi from './Sanad/Containers/DialogProfileRawi';
import DetailsColor from './Sanad/Containers/DetailsColor';
import DiagramSanad from './Sanad/Containers/DiagramSanad';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HadithTerm from './HadithTerm/HadithTerm';
import TabDialog from './DialogForTab/TabDialog';
import LoginForm from './LoginForm/LoginForm';

import { connect } from 'react-redux';


class App extends React.Component {
  render() {
    const theme = createMuiTheme(this.props.globalTheme);
    return (
      <div style={{ display: 'flex', flexFlow: 'column', width: '100%', height: '100%' }}>
        <MuiThemeProvider theme={theme}>
          <AppBar />
          <ComboBox />
          <GridBreakPoint />
          <SnackBars />
          <ArabicKeyboard />
          <FormNote />
          <Biography />
          <Info />
          <ProfileRawi />
          <DialogProfileRawi />
          <DetailsColor />
          <DiagramSanad />
          <HadithTerm />
          <TabDialog />
          <LoginForm />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globalTheme: state.themeSetting.globalTheme
  };
};

export default connect(mapStateToProps)(App);

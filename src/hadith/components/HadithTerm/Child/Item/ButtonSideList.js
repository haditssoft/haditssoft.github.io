import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import SideList from './SubItem/SideList';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      margin: 'auto 0', // responsible for vertically justify
      // maxWidth: 360,
      // backgroundColor: theme.palette.background.paper,
    }
}));

const ButtonSideList = props => {
    const classes = useStyles();
    const { select, setSelect } = props;
    return (
        <div className={classes.root}>
            <SideList theState={[select, setSelect]} head={'Penyandaran'} list={['Qudsi', 'Marfu\'', 'Mauquf', 'Maqthu\'']} />
            <Divider />
            <SideList theState={[select, setSelect]} head={'Gugurnya Sanad'} list={['Mursal', 'Mu\'dhal', 'Munqathi\'', 'Mu\'allaq']} />
            <Divider />
            <SideList theState={[select, setSelect]} head={'Jumlah Riwayat'} list={['Gharib', '\'Aziz', 'Masyhur', 'Mutawatir']} />
        </div>
    );
}

export default React.memo(ButtonSideList);
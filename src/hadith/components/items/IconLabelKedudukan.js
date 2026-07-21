import React from 'react';
// import IconMutawatir from '@material-ui/icons/BatteryChargingFull';
// import IconMarfu from '@material-ui/icons/BatteryCharging90';
// import IconMauquf from '@material-ui/icons/BatteryCharging80';
// import IconMaqthu from '@material-ui/icons/BatteryCharging60';
// import IconMursal from '@material-ui/icons/BatteryCharging50';
// import IconMunqathi from '@material-ui/icons/BatteryCharging30';
// import IconMuallaq from '@material-ui/icons/BatteryCharging20';
import Star from '@material-ui/icons/Star';
import StarTwoTone from '@material-ui/icons/StarTwoTone';
import StarHalf from '@material-ui/icons/StarHalf';
import StarBorder from '@material-ui/icons/StarBorder';
// import { IconAlQuran, IconQudsi } from './IconsMDI';

const iconLabelKedudukan = [
    {icon: <StarTwoTone />, label: 'Hadits Al Qur\'an', panel: 'KumpulanAlQuran'},
    {icon: <StarTwoTone />, label: 'Hadits Qudsi', panel: 'KumpulanQudsi'},
    {icon: <Star />, label: 'Hadits Mutawatir', panel: 'KumpulanMutawatir'},
    {icon: <Star />, label: 'Hadits Marfu\'', panel: 'KumpulanMarfu'},
    {icon: <StarHalf />, label: 'Hadits Mauquf', panel: 'KumpulanMauquf'},
    {icon: <StarHalf />, label: 'Hadits Maqthu\'', panel: 'KumpulanMaqthu'},
    {icon: <StarBorder />, label: 'Hadits Mursal', panel: 'KumpulanMursal'},
    {icon: <StarBorder />, label: 'Hadits Munqathi\'', panel: 'KumpulanMunqathi'},
    {icon: <StarBorder />, label: 'Hadits Mu\'allaq', panel: 'KumpulanMuallaq'}
];

export default iconLabelKedudukan;
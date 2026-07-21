import React from 'react';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import AccessibleIcon from '@material-ui/icons/Accessible';
import { IconIman, IconAkhlaq, IconFood, IconIlmu, IconAlQuran, IconKepribadian,
IconMuamalah, IconPakaian, IconHukum, IconJihad, IconKriminal } from './IconsMDI';

const iconLabelTema = [
    {icon: <IconIman />, label: 'Iman', panel: 'TemaIman'},
    {icon: <IconIlmu />, label: 'Ilmu', panel: 'TemaIlmu'},
    {icon: <AccessibleIcon />, label: 'Umat Terdahulu', panel: 'TemaUmat'},
    {icon: <HourglassFullIcon />, label: 'Perjalanan Hidup', panel: 'TemaPerjalanan'},
    {icon: <IconAlQuran />, label: 'Al Qur\'an', panel: 'TemaAlQuran'},
    {icon: <IconAkhlaq />, label: 'Akhlaq dan Adab', panel: 'TemaAkhlaq'},
    {icon: <i className="fas fa-kaaba fa-lg" />, label: 'Ibadah', panel: 'TemaIbadah'},
    {icon: <IconFood />, label: 'Makanan Minuman', panel: 'TemaMakanan'},
    {icon: <IconPakaian />, label: 'Pakaian Perhiasan', panel: 'TemaPakaian'},
    {icon: <IconKepribadian />, label: 'Masalah Kepribadian', panel: 'TemaKepribadian'},
    {icon: <IconMuamalah />, label: 'Mu\'amalah', panel: 'TemaMuamalah'},
    {icon: <IconHukum />, label: 'Putusan Hukum', panel: 'TemaHukum'},
    {icon: <IconKriminal />, label: 'Kriminalitas', panel: 'TemaKriminalitas'},
    {icon: <IconJihad />, label: 'Jihad', panel: 'TemaJihad'}
];

export default iconLabelTema;
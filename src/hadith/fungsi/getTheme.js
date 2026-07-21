import lightBlue from '@material-ui/core/colors/lightBlue';

export const light = () => ({
    overrides: {
        MuiIconButton: {
            root: {
                color: 'inherit'
            }
        }
    }
});

export const dark = () => ({
    palette: {
        type: 'dark',
        primary: {
            light: lightBlue[600],
            main: '#007ACC', //"#3f51b5",
            dark: lightBlue[800],
            contrastText: "#fff"
        },
        grey: {
            900: '#161616'
        },
        background: {
            paper: '#161616'
        }
    },
    overrides: {
        MuiIconButton: {
            root: {
                color: '#00AEDB'
            },
        },
        MuiTab: {
            textColorPrimary: {
                color: '#00AEDB'
            },
        },
        MuiSvgIcon: {
            colorAction: {
                color: '#00AEDB'
            },
            root: {
                color: '#00AEDB'
            },
        },
        MuiListItemIcon: {
            root: {
                color: '#00AEDB'
            },
        },
    }
});
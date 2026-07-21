import { createMuiTheme } from '@material-ui/core/styles';

const underlineThemeColor = (colour, anotherOveride) => createMuiTheme({
    // const theme = useTheme();

    overrides: {
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottom: "1px solid " + colour,
                },
                '&$focused:after': {
                    transform: 'scaleX(1)',
                },
                '&$error:after': {
                    borderBottomColor: colour,          
                },
                '&:before': {
                    borderBottom: "1px solid #E0E0E0",
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: "1px solid " + colour,
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderBottom: "1px solid " + colour
                    }
                },
                '&$disabled:before': {
                    borderBottomStyle: 'dotted'
                }
            },
        },
        ...anotherOveride,
    },
    typography: { useNextVariants: true },
});

export default underlineThemeColor;

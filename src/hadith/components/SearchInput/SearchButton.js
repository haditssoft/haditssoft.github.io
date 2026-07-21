import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    iconButton: {
        padding: 10,
        },
    ibColor: {
            color: theme.palette.type === 'dark' ? undefined : theme.palette.text.secondary
        }
}));

const SearchButton = React.forwardRef((props, ref) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleRef = React.useRef(props.handleClicked);

    React.useEffect(() => {
        handleRef.current = props.handleClicked;
    }, [props.handleClicked]);

    const searchIcon = React.useMemo(() => (
        <IconButton
            ref={ref}
            className={classes.iconButton}
            aria-label="Search"
            onClick={handleRef.current}
        >
            <SearchIcon className={classes.ibColor} />
        </IconButton>
    ), [theme.palette.type]);
    
    return searchIcon;
})

export default SearchButton;

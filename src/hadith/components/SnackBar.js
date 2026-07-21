import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import Slide from "@material-ui/core/Slide";

import { connect } from 'react-redux';
import {
    OPENSNACKBARS,
    PUSHTOQUEUE,
    TOTALROW,
    BOOKMARKLIST,
    BOOKMARKTABLE,
    CHANGENUMBER,
    UNBOOKMARK
} from '../store/action';
import ProgressStatic from './ProgressStatic';
import { deletionQueue, hideNoteBadge, undoDeletion, executeDeletion } from '../fungsi/deleteForSnackBar';
import getKitabName from '../fungsi/getKitabName';
import { prevBookmarkData, setPrevBookmarkData } from './Bookmark/ListOfBookmarks/CellOfBookmarks';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: theme.palette.primary.dark,
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: green[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        position: 'relative',
        height: 36,
    },
    zIdx: {
        top: 1,
        left: 1,
        zIndex: 1,
        padding: '7px',
    },
    fromTop: {
        top: 2
    },
});

const MySnackbarContent = React.forwardRef((props, ref) => {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    const actionButton = [
        variant === 'warning' ? <Button
            className={classes.fromTop}
            key="undo"
            color="secondary"
            size="small"
            onClick={onClose}>
            UNDO
            </Button> : null,
        <div className={classes.wrapper} key="close">
            <IconButton
                aria-label="Close"
                color="inherit"
                className={classes.zIdx}
                // this style here is very important
                // to differentiate between close and undo button
                // when perform check in handleClose()
                style={{ position: 'absolute' }}
                onClick={onClose}
            >
                <CloseIcon className={classes.icon} />
            </IconButton>
            <ProgressStatic opaq={variant} />
        </div>
    ];

    return (
        <SnackbarContent
            ref={ref}
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={actionButton}
            {...other}
        />
    );
});

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
};

class CustomizedSnackbars extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.openSnackBar === nextProps.openSnackBar) {
            return false;
        } else {
            return true;
        };
    };

    handleClose = (event, reason) => {
        if (event && this.props.messageSnackBar.variant === 'warning' && reason !== 'clickaway') {
            // we can check style.position here bcos
            // close button styled with inline style
            // if (event.currentTarget.style.position === 'absolute') {
            //     this.props.onUndoDeleteBookmark(false);
            // } else
            if (event.target.innerText === 'UNDO') {
                undoDeletion(this.props.messageSnackBar.key);
                // don't do this if the delete come from select existTitle
                // prevBookmarkData will hold value of null initially
                // it will holds object {} if single item of bookmark about to be deleted
                // see CellOfBookmarks.js in handleDeleteItem()
                if (prevBookmarkData) {
                    let arrayOfBookName = Object.keys(prevBookmarkData);
                    let easyToFetch = [];
                    for (let idx = 0, n = arrayOfBookName.length; idx < n; idx++) {
                        const kitab = arrayOfBookName[idx];
                        for (let i = 0, n = prevBookmarkData[kitab].length; i < n; i++) {
                            const num = prevBookmarkData[kitab][i];
                            easyToFetch.push({ book: kitab, no: num });
                        }
                    }
                    const currentHadithRealPos = easyToFetch.findIndex(obj => {
                        if (obj.book === getKitabName(this.props.kitabName)) {
                            if (this.props.kitabName.includes(obj.no)) {
                                return true;
                            }
                        }
                        return false;
                    });
                    this.props.onNumberChanged(currentHadithRealPos + 1);
                    const totalHadits = easyToFetch.length;
                    if (totalHadits !== this.props.totalRow) {
                        this.props.onDispatchCountRow(totalHadits);
                    }
                    this.props.onStoreBookmarkList(easyToFetch);
                    this.props.onStoreBookmarkTable(prevBookmarkData);
                    this.props.onUnBookmark([]);
                    setPrevBookmarkData(null);
                }
            }
        };
        if (reason === 'clickaway' || reason === 'timeout' && this.props.openSnackBar === false) {
            return;
        }
        this.props.onShowHideSnackBars(false, this.props.messageSnackBar);
    };

    processQueue = () => {
        if (deletionQueue.length !== 0) {
            executeDeletion(this.props.messageSnackBar.key, hideNoteBadge);
            const getPendingList = [...this.props.unBookmark];
            getPendingList.shift();
            this.props.onUnBookmark(getPendingList);
        }
        if (this.props.queueSnackBar.length > 0) {
            const queue = [...this.props.queueSnackBar];
            const fistMassage = queue.shift();
            // send to/renew the state after remove first message
            this.props.onShowHideSnackBars(true, fistMassage);
        }
    };

    handleExited = () => {
        this.processQueue();
    };

    handleEntered = () => {
        if (this.props.queueSnackBar.length > 0) {
            const queue = [...this.props.queueSnackBar];
            // remove fistr index
            queue.splice(0, 1);
            // renew the queue
            this.props.onPushSnackBarsQueue(queue);
        };
    };

    render() {
        const { openSnackBar } = this.props;
        const { key, variant, message } = this.props.messageSnackBar;

        return (
            <div>
                <Snackbar
                    key={key === undefined ? 0 : key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={openSnackBar}
                    TransitionComponent={SlideTransition}
                    disableWindowBlurListener
                    onEntered={this.handleEntered}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant={variant === undefined ? 'success' : variant} // info success, warning, error
                        message={message === undefined ? '' : message}
                    />
                </Snackbar>
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        openSnackBar: state.snackBarsSetting.openSnackBar,
        messageSnackBar: state.snackBarsSetting.messageSnackBar,
        queueSnackBar: state.snackBarsSetting.queueSnackBar,
        totalRow: state.mainBooksData.TotalRow,
        kitabName: state.mainBooksData.KitabName,
        unBookmark: state.deletionPending.unBookmark
    };
};

const mapDispatchToState = dispatch => {
    return {
        onShowHideSnackBars: (booLean, mess) => dispatch({
            type: OPENSNACKBARS,
            show: booLean,
            message: mess
        }),
        onPushSnackBarsQueue: (arRay) => dispatch({ type: PUSHTOQUEUE, queue: arRay }),
        onDispatchCountRow: (rows) => dispatch({ type: TOTALROW, totalRow: rows }),
        onStoreBookmarkList: (arRay) => dispatch({ type: BOOKMARKLIST, value: arRay }),
        onStoreBookmarkTable: (obj) => dispatch({ type: BOOKMARKTABLE, value: obj }),
        onNumberChanged: (pos) => dispatch({ type: CHANGENUMBER, position: pos }),
        onUnBookmark: (arRay) => dispatch({ type: UNBOOKMARK, delete: arRay })
    };
};

export default connect(mapPropsToState, mapDispatchToState)(withTheme(CustomizedSnackbars));

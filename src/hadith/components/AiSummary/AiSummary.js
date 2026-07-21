import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { connect } from 'react-redux';

var styles = function (theme) {
    return {
        root: {
            width: '100%',
            position: 'relative',
            minHeight: 48,
        },
        linearProgress: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
        },
        summaryContainer: {
            padding: theme.spacing(1, 1.5),
        },
        summaryLabel: {
            fontWeight: 500,
            marginBottom: theme.spacing(0.5),
        },
        errorText: {
            color: theme.palette.error.main,
        },
        list: {
            paddingLeft: theme.spacing(2.5),
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
        listItem: {
            marginBottom: theme.spacing(0.25),
        },
        inlineCode: {
            fontFamily: 'monospace',
            backgroundColor: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.06)',
            padding: '2px 4px',
            borderRadius: 3,
            fontSize: '0.875em',
        },
        codeBlock: {
            fontFamily: 'monospace',
            backgroundColor: theme.palette.type === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.06)',
            padding: theme.spacing(1),
            borderRadius: 4,
            overflowX: 'auto',
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
            '& code': {
                backgroundColor: 'transparent',
                padding: 0,
                fontSize: '0.875em',
            },
        },
        bodyText: {
            letterSpacing: theme.typography.caption.letterSpacing,
            color: theme.palette.type === 'dark'
                ? theme.palette.text.secondary
                : theme.palette.text.primary,
            lineHeight: theme.typography.subtitle1.lineHeight,
        },
        markdownBody: {
            '& > :last-child': {
                marginBottom: 0,
            },
            '& table': {
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: theme.spacing(0.5),
                marginBottom: theme.spacing(0.5),
            },
            '& th, & td': {
                border: '1px solid ' + theme.palette.divider,
                padding: theme.spacing(0.5, 1),
                textAlign: 'left',
            },
            '& th': {
                backgroundColor: theme.palette.type === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.03)',
                fontWeight: 600,
            },
            '& img': {
                maxWidth: '100%',
                borderRadius: 4,
            },
        },
    };
};

var AiSummary = function (props) {
    var classes = props.classes;

    var renderers = {
        paragraph: function (nodeProps) {
            return (
                <Typography variant='body2' gutterBottom className={classes.bodyText}>
                    {nodeProps.children}
                </Typography>
            );
        },
        heading: function (nodeProps) {
            switch (nodeProps.level) {
                case 1:
                    return <Typography variant='h5' component='h1' gutterBottom className={classes.bodyText}>{nodeProps.children}</Typography>;
                case 2:
                    return <Typography variant='h6' component='h2' gutterBottom className={classes.bodyText}>{nodeProps.children}</Typography>;
                case 3:
                    return <Typography variant='subtitle1' component='h3' gutterBottom className={classes.bodyText}>{nodeProps.children}</Typography>;
                default:
                    return <Typography variant='subtitle2' component={'h' + nodeProps.level} gutterBottom className={classes.bodyText}>{nodeProps.children}</Typography>;
            }
        },
        link: function (nodeProps) {
            return (
                <Link href={nodeProps.href} target='_blank' rel='noopener noreferrer'>
                    {nodeProps.children}
                </Link>
            );
        },
        list: function (nodeProps) {
            return (
                <Typography
                    component={nodeProps.ordered ? 'ol' : 'ul'}
                    variant='body2'
                    className={`${classes.list} ${classes.bodyText}`}
                >
                    {nodeProps.children}
                </Typography>
            );
        },
        listItem: function (nodeProps) {
            return (
                <Typography component='li' variant='body2' className={`${classes.listItem} ${classes.bodyText}`}>
                    {nodeProps.children}
                </Typography>
            );
        },
        blockquote: function (nodeProps) {
            return (
                <Box
                    component='blockquote'
                    borderLeft={3}
                    borderColor='divider'
                    pl={1.5}
                    my={1}
                    color='text.secondary'
                >
                    {nodeProps.children}
                </Box>
            );
        },
        code: function (nodeProps) {
            if (nodeProps.inline) {
                return <code className={classes.inlineCode}>{nodeProps.children}</code>;
            }
            return (
                <Paper elevation={0} className={classes.codeBlock}>
                    <code>{nodeProps.children}</code>
                </Paper>
            );
        },
        thematicBreak: function () {
            return <Divider style={{ marginTop: 8, marginBottom: 8 }} />;
        },
    };

    return (
        <div className={classes.root}>
            {props.aiSummaryLoading && <LinearProgress classes={{ root: classes.linearProgress }} />}

            {props.aiSummary && !props.aiSummaryLoading && (
                <div className={classes.summaryContainer}>
                    <Typography variant='subtitle2' className={`${classes.summaryLabel} ${classes.bodyText}`}>
                        Ringkasan AI
                    </Typography>
                    <div className={classes.markdownBody}>
                        <ReactMarkdown plugins={[remarkGfm]} renderers={renderers}>
                            {props.aiSummary}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {props.aiSummaryError && !props.aiSummaryLoading && (
                <div className={classes.summaryContainer}>
                    <Typography variant='body2' className={`${classes.errorText} ${classes.bodyText}`}>
                        Gagal memuat ringkasan
                    </Typography>
                </div>
            )}
        </div>
    );
};

var mapStateToProps = function (state) {
    return {
        aiSummary: state.aiSummary.summary,
        aiSummaryLoading: state.aiSummary.loading,
        aiSummaryError: state.aiSummary.error,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(AiSummary));

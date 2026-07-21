const showSnackBar = (queueSnackBar, message, openSnackBar,
    onPushSnackBarsQueue, onShowHideSnackBars, messageSnackBar) => {

    const queue = [...queueSnackBar];
    queue.push(message);
    // check if snack is in open state
    if (openSnackBar) {
      // send to queue
      onPushSnackBarsQueue(queue);
      // immediately begin dismissing current message
      // to start showing new one, and this is handled by snackbar.js onExited
      onShowHideSnackBars(false, messageSnackBar);
    } else {
      onShowHideSnackBars(true, queue[0]);
    };
};

export default showSnackBar;
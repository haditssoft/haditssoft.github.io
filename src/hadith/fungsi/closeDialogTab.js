export let closeDialogTab = null; // function dispatcher

const setCloseDialogTab = (onShowTabDialog) => {
    closeDialogTab = onShowTabDialog;
}

export default setCloseDialogTab;
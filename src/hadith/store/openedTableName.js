// will be use in senderDataRequest.js for saving lastread
export let currentOpenedTable = '';
export let prevOpenedTable = '';

const setOpenedTableName = name => {
    if (prevOpenedTable) {
        prevOpenedTable = currentOpenedTable;        
    } else {
        prevOpenedTable = name;
    }
    currentOpenedTable = name;
}

export default setOpenedTableName;
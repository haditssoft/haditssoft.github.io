import { switchServer, authFetch } from '../sender/api';
export let deletionQueue = [];
export let hideNoteBadge = null;
let checkIsNoteBelongsToHadits = undefined;

export const prepareDeletion = (obj, dispatcher, fetcherKitabName) => {
    deletionQueue.push(obj);
    hideNoteBadge = dispatcher;
    if (fetcherKitabName !== undefined) {
        checkIsNoteBelongsToHadits = fetcherKitabName;
    }
}

export const executeDeletion = (id, callback) => {
    const targetDeletion = deletionQueue.find(el => el.id === id);
    if (targetDeletion !== undefined) {
        const token = localStorage.getItem('token');
        if (token) {
            const isBookmark = targetDeletion.theStore === 'bookmark';
            const url = isBookmark
                ? switchServer + 'bookmarks/' + targetDeletion.theTargetKey
                : switchServer + 'notes/' + targetDeletion.theStore + '/' + targetDeletion.theTargetKey;

            const options = {};
            if (targetDeletion.storeMethod) {
                options.method = targetDeletion.storeMethod;
                options.body = JSON.stringify(targetDeletion.valueToBeSet);
            } else {
                options.method = 'DELETE';
            }

            authFetch(url, options)
                .then(res => {
                    if (res.status === 200 || res.status === 204) {
                        deletionQueue = deletionQueue.filter(el => el.id !== id);
                        if (typeof callback === 'function') {
                            if (checkIsNoteBelongsToHadits() === targetDeletion.check) {
                                return callback();
                            }
                        } else if (targetDeletion.updateList) {
                            return targetDeletion.updateList();
                        }
                    } else {
                        return alert('Failed to delete data');
                    }
                })
                .catch(err => console.log('fetch delete', err));
        } else {
            alert('Cannot perform deletion while you are signed out');
        }
    }
}

export const undoDeletion = (id) => {
    deletionQueue = deletionQueue.filter(el => el.id !== id);
}
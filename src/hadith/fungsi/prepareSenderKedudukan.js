import sender from '../sender/senderDataRequest';
import { switchServer, authFetch } from '../sender/api';
import { getMainTable_Kedudukan } from './getTableName';

const actualSender = (channel, lastRead, table) => {
    const mainKitab = getMainTable_Kedudukan(lastRead, table);
    return sender(channel, [mainKitab, lastRead, table]);
}
// 'classificationData', 'KumpulanAlQuran'
const prepareSender = (channel, table) => {
    const token = localStorage.getItem('token');
    if (token) {
        authFetch(switchServer + 'lastRead/' + table)
          .then(res => {
              if (res.status === 404) return null;
              if (!res.ok) throw new Error('Failed to fetch lastread');
              return res.json();
          })
          .then(resData => {
              let num = 1;
              if (resData) {
                  num = typeof resData === 'number' ? resData : (resData.number || resData.hadith_number || 1);
              }
              actualSender(channel, num, table);
          })
          .catch(err => {
              console.log('lastread', err);
              actualSender(channel, 1, table);
          });
    } else {
        actualSender(channel, 1, table);
    }
};

export default prepareSender;
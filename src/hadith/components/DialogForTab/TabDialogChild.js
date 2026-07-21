import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import BookIcon from '@material-ui/icons/Book';
import RankingIcon from '@material-ui/icons/Star';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListHadithIcon from '@material-ui/icons/ImportContacts';
import ChainIcon from '@material-ui/icons/DeviceHub';
import SimilarIcon from '@material-ui/icons/Widgets';
import EmailIcon from '@material-ui/icons/Email';

import Tabs from '../Tabs';
import Books from "../items/Books";
import RankWrapper from '../items/RankWrapper';
import ExpansionPanel from '../ExpansionPanel';
import InputAndCombo from '../Bookmark/InputAndCombo';
import SelectBook from '../SearchResult/SelectBooks';
import Sanad from '../Sanad/Containers/Sanad';
import Similar from '../Similar/Container/Similar';
import RawiSearch from '../RawiSearch/RawiQuery';
import ReportForm from '../Report/ReportForm';
import AiSummary from '../AiSummary/AiSummary';
import iconLabelTema from '../items/IconLabelTema';
import { IconSearchRawi, IconSearchResult, IconTematis } from '../items/IconsMDI';

const areEqual = (prev, next) => {
    if (prev.whichTab === next.whichTab) {
        return true;
    }
    return false;
}

const TabDialogChild = (props) => {
    const handleClose = () => {
        props.tirggerClose();
    }

    return (
        <>
            <DialogContent id="tab-dialog">
                {props.whichTab == 'left' ? (<Tabs
                    directIon='rtl'
                    tooltip={['Daftar buku','Berdasar Kedudukan','Tematis','Bookmarks','Hasil cari']}
                    icon={[<BookIcon />, <RankingIcon />, <IconTematis />, <BookmarkIcon />, <IconSearchResult />]}
                    tabContent={[<Books />,
                    <RankWrapper />,
                    <ExpansionPanel iconlabel={iconLabelTema} />,
                    <InputAndCombo />,
                    <SelectBook />]}
                />) : (<Tabs
                directIon='ltr'
                tooltip={['Daftar hadits','Sanad','Hadits serupa','Cari rawi','Laporkan']}
                icon={[<ListHadithIcon />, <ChainIcon />, <SimilarIcon />, <IconSearchRawi />, <EmailIcon />]}
                tabContent={[<AiSummary />, <Sanad />, <Similar />, <RawiSearch />, <ReportForm />]} />)}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Close
            </Button>
            </DialogActions>
        </>
    );
}

export default React.memo(TabDialogChild, areEqual);

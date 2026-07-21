import React from 'react';

const RootBook = ({book}) => {
    return (
        <>
        {book}
        <span style={{ paddingLeft: '15px' }}></span>
        </>
    );
};

export default React.memo(RootBook, () => true);
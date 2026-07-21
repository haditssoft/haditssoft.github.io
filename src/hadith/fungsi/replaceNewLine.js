import React from 'react';
import reactStringReplace from 'react-string-replace';

const replaceNewLine = (text) => {

    let replacedText = text;

    if (/\r\n/.test(text)) {
        replacedText = reactStringReplace(replacedText, /[\r\n]/g, (match, i) => (
            <br key={i} />
        ));
    };

    return replacedText;
};

export default replaceNewLine;
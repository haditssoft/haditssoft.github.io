import React from 'react';
import reactStringReplace from 'react-string-replace';
import { keyWords, columnName } from '../store/searchKeywords';
import nestedColoring from './nestedColoring';

const replaceBraces = (text, whatDataIsShown, lang) => {

    let replacedText = text;
    let prevIndex = 0;

    if (whatDataIsShown === 'SEARCHDATA' && keyWords.length && lang.includes(columnName)) {
        // Warnai Nama Rawi, Replace [text] jadi <span style='color:green'>text</span>
        // if (text.includes('[')) {
            replacedText = reactStringReplace(replacedText, /\[(\D*?)\]/g, (match, i) => {
                prevIndex = i;
                const coloredText = nestedColoring(match, keyWords, prevIndex, columnName);
                return (
                    <span
                        key={match + i}
                        style={{ color: '#F50057' }}
                    >
                        {coloredText.length === 0 ? match : coloredText}
                    </span>
                );
            });
        // };
        
        // Warnai ayat Al Qur'an di dalam curlybraces
        // if (text.includes('{')) {
            replacedText = reactStringReplace(replacedText, /\{(\D*?)\}/g, (match, i) => {
                // I need to create the key like this because using {match + i} doesn't always work
                // in some cases it would throw error cause Encountered two children with the same key
                if (i === 0) {
                    prevIndex += 1;
                } else {
                    prevIndex += i;
                };
                const coloredText = nestedColoring(match, keyWords, prevIndex, columnName);
                return (
                    <span
                        key={match + prevIndex}
                        style={{ color: 'green' }}
                    >
                        {'{'}{coloredText.length === 0 ? match : coloredText}{'}'}
                    </span>
                );
            });
        // };
    } else {
        // Warnai Nama Rawi, Replace [text] jadi <span style='color:green'>text</span>
        // if (text.includes('[')) {
            // for arabic text /\u200F\u0020\u200F(\D*?)\u200F\u0020\u200F/g
            replacedText = reactStringReplace(replacedText, /\[(\D*?)\]/g, (match, i) => {
                prevIndex = i;
                return <span key={match + i} style={{ color: '#F50057' }}>{match}</span>;
            });
        // };
        
        // Warnai ayat Al Qur'an di dalam curlybraces
        // if (text.includes('{')) {
            replacedText = reactStringReplace(replacedText, /\{(\D*?)\}/g, (match, i) => {
                // I need to create the key like this because using {match + i} doesn't always work
                // in some cases it would throw error cause Encountered two children with the same key
                if (i === 0) {
                    prevIndex += 1;
                } else {
                    prevIndex += i;
                };
                return <span key={match + prevIndex} style={{ color: 'green' }}>{'{'}{match}{'}'}</span>;
            });
        // };
    };

    return replacedText;
};

export default replaceBraces;
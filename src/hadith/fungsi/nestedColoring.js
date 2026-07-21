import React from 'react';
import reactStringReplace from 'react-string-replace';
import matchWithoutDiacritic from './matchWithoutDiacritic';

const nestedColoring = (match, keyWords, prevIndex, lang) => {
    let coloredText = match;
    let counterIdx = prevIndex;
    
    keyWords.map((word, idx) => {
        counterIdx += idx;
        let diacriticRegEx = word;
        if (lang === 'Gundul') diacriticRegEx = matchWithoutDiacritic(word);
        coloredText = reactStringReplace(coloredText, diacriticRegEx, (exact, index) => {
            counterIdx += index;
            return (
                <span
                    key={counterIdx + new Date().getTime()}
                    style={{ backgroundColor: 'yellow' }}
                >
                    {exact}
                </span>
            );
        });
    })

    return coloredText;
};

export default nestedColoring;
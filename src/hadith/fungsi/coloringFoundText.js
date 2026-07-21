import React from 'react';
import reactStringReplace from 'react-string-replace';
import matchWithoutDiacritic from './matchWithoutDiacritic';

const coloringFoundText = (text, keyWord, lang) => {

    let replacedText = text;
    let prevIndex = 0;

    keyWord.map(word => {

        let diacriticRegEx = word; // initial value without modify
        if (lang === 'Gundul') diacriticRegEx = matchWithoutDiacritic(word);
        // Coloring search keywords, Replace KeyWord jadi <span style='backgroundColor:yellow'>KeyWord</span>
        replacedText = reactStringReplace(replacedText, diacriticRegEx, (match, i) => {
            prevIndex += i;
            return <span key={prevIndex + 1000} style={{ backgroundColor: 'yellow' }}>{match}</span>;
        });
    });

    return replacedText;
};

export default coloringFoundText;
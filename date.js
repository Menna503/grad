console.log(new Date());
function englishToArabicNumber(englishNumber) {
    const englishToArabicMap = {
        '0': '٠',
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩'
    };
    return englishNumber
        .split('')
        .map(char => englishToArabicMap[char])
        .join('');

}
 console.log(englishToArabicNumber('30201211'));
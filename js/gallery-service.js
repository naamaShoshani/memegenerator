'use strict'

function createImgs() {
    gImgs.push(createImg(1, 'meme-imgs/1.jpg', []));
    gImgs.push(createImg(2, 'meme-imgs/2.jpg', []));
    gImgs.push(createImg(3, 'meme-imgs/3.jpg', []));
    gImgs.push(createImg(4, 'meme-imgs/4.jpg', []));
    gImgs.push(createImg(5, 'meme-imgs/5.jpg', []));
    gImgs.push(createImg(6, 'meme-imgs/6.jpg', []));
    gImgs.push(createImg(7, 'meme-imgs/7.jpg', []));
    gImgs.push(createImg(8, 'meme-imgs/8.jpg', []));
    gImgs.push(createImg(9, 'meme-imgs/9.jpg', []));
    gImgs.push(createImg(10, 'meme-imgs/10.jpg', []));
    gImgs.push(createImg(11, 'meme-imgs/11.jpg', []));
    gImgs.push(createImg(12, 'meme-imgs/12.jpg', []));
    gImgs.push(createImg(13, 'meme-imgs/13.jpg', []));
    gImgs.push(createImg(14, 'meme-imgs/14.jpg', []));
    gImgs.push(createImg(15, 'meme-imgs/15.jpg', []));
    gImgs.push(createImg(16, 'meme-imgs/16.jpg', []));
    gImgs.push(createImg(17, 'meme-imgs/17.jpg', []));
    gImgs.push(createImg(18, 'meme-imgs/18.jpg', []));
    gImgs.push(createImg(19, 'meme-imgs/19.jpg', []));
    gImgs.push(createImg(20, 'meme-imgs/20.jpg', []));
}

function createImg(id, url, keywords) {
    var img = {
        id: id,
        url: url,
        keywords: keywords
    };
    return img;
}

function sortImgsByInput(input) {
    if (input === '')
        return gImgs;
    var imgsByInput = gImgs.filter(function (img) {
        var keywords = img.keywords;
        var matchedWord = keywords.find(function (word) {
            var slicedWord = sliceFromStrByIdx(input.length, word);
            return slicedWord === input;
        })
        return matchedWord;
    })
    return imgsByInput;
}

function createPopularImgsMap() {
    var popularImgsMap = loadPopularMapFromStorage();
    if (popularImgsMap) return popularImgsMap;
    popularImgsMap = {};
    popularImgsMap = {
        'happy': 2,
        'racist': 1
    };
    savePopularMapToStorage(popularImgsMap);
    return popularImgsMap;
}
function getImgKeywordByinput(input) {
    for (var i = 0; i < gImgs.length; i++) {
        var keywords = gImgs[i].keywords;
        var matchedKeyword = keywords.find(function (keyword) {
            return keyword === input;
        })
        if (matchedKeyword) break;
    }
    return matchedKeyword;
}

function addPopKeyword(keyword) {
    if (keyword) {
        gPopularImgsMap[keyword] ? gPopularImgsMap[keyword]++ : gPopularImgsMap[keyword] = 1;
        checkMaxLimitFontSize(keyword);
        savePopularMapToStorage(gPopularImgsMap);
    }
}

function checkMaxLimitFontSize(keyword) {
    var windowWidth = document.body.clientWidth;
    if (windowWidth <= 500) {
        if (gPopularImgsMap[keyword] >= 5)
            gPopularImgsMap[keyword] = 5;
    }
    else {
        if (gPopularImgsMap[keyword] >= 10)
            gPopularImgsMap[keyword] = 10;
    }
}

function putKeyWordsOnImg(keywords) {
    var strToHtml = '<br> key words for meme: <br>';
    for (var i = 0; i < keywords.length; i++)
        i === keywords.length - 1 ? strToHtml += ' ' + keywords[i] + ' ' : strToHtml += ' ' + keywords[i] + ' , ';
    return strToHtml;
}


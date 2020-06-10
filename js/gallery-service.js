'use strict'


// Swich to id array


function createImgs() {
    gImgs.push(createImg(1, 'meme-imgs/1.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(2, 'meme-imgs/2.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(3, 'meme-imgs/3.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(4, 'meme-imgs/4.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(5, 'meme-imgs/5.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(6, 'meme-imgs/6.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(7, 'meme-imgs/7.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(8, 'meme-imgs/8.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(9, 'meme-imgs/9.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(10, 'meme-imgs/10.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(11, 'meme-imgs/11.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(12, 'meme-imgs/12.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(13, 'meme-imgs/13.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(14, 'meme-imgs/14.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(15, 'meme-imgs/15.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(16, 'meme-imgs/16.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(17, 'meme-imgs/17.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(18, 'meme-imgs/18.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(19, 'meme-imgs/19.jpg', ['keyword', 'keyword']));
    gImgs.push(createImg(20, 'meme-imgs/20.jpg', ['keyword', 'keyword']));
}



function createImg(id, url, keywords) {
    var img = {
        id: id,
        url: url,
        keywords: keywords
    };
    return img;
}



function putKeyWordsOnImg(keywords) {
    var strToHtml = '<br> Keywords:<br>';
    for (var i = 0; i < keywords.length; i++)
        i === keywords.length - 1 ? strToHtml += ' ' + keywords[i] + ' ' : strToHtml += ' ' + keywords[i] + ' , ';
    return strToHtml;
}


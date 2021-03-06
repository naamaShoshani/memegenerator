'use strict'

var gTrans = {

    'main-headline': {
        en: 'Na\'aMeme Generator',
        he: 'מחולל נעממים',
    },

    'select-img': {
        en: 'Select an image to edit:',
        he: ':בחר תמונה לעריכה',
    },


}

var gCurrLang = 'en';

function getTrans(transKey) {
    if (!gTrans[transKey]) return 'UNKNOWN'
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);

        if (el.nodeName === 'INPUT') el.placeholder = trans
        else el.innerText = trans;
    }
}

function setLang(lang) {
    gCurrLang = lang;
}
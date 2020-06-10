'use strict'

var gImgs = [];

var gCanvasImg;

function init() {
    createImgs();
    renderImgs(gImgs);

}
function renderImgs(imgs) {
    var strHtmls = imgs.map(function (img) {
        var strHtml = `<li onclick = "openModal(${
            img.id
            })" class="img-pick fit-background img-${
            img.id
            }" style="background-image: url('meme-imgs/${img.id}.jpg')">
            <div class = "img-hover">
            ${putKeyWordsOnImg(img.keywords)}
            </div>
             </li>`;
        return strHtml;
    });
    var strHtml = strHtmls.join('');
    var elImgsContainer = document.querySelector('.imgs-container ul');
    elImgsContainer.innerHTML = strHtml;
}
function openModal(id) {
    var elModal = document.querySelector('#editor-modal');
    resetMemeModel(id)
    initCanvas(id);
    renderTextarea(0);
    elModal.classList.remove('hide');
    var elBody = document.querySelector('body');
    elBody.classList.add('no-scroll');
}
function closeModal() {
    var elModal = document.querySelector('#editor-modal');
    elModal.classList.add('hide');
    var elBody = document.querySelector('body');
    elBody.classList.remove('no-scroll');
}
function initCanvas(id) {
    var elCanvas = document.querySelector('#meme-canvas');
    gCanvasImg = new Image();
    gCanvasImg.onload = function () {
        elCanvas.width = 500;
        elCanvas.height = gCanvasImg.height / gCanvasImg.width * 500;
        var ctx = elCanvas.getContext('2d');
        ctx.drawImage(gCanvasImg, 0, 0, 500, gCanvasImg.height / gCanvasImg.width * 500);
    }
    gCanvasImg.src = `meme-imgs/${id}.jpg`;
}
function setCanvas(txts = [], activeTxt = false) {
    var elCanvas = document.querySelector('#meme-canvas');
    var ctx = elCanvas.getContext('2d');
    ctx.drawImage(gCanvasImg, 0, 0, 500, gCanvasImg.height / gCanvasImg.width * 500);
    if (txts.length > 0) renderTxtsOnCanvas(txts);
    if (activeTxt) renderFrag(activeTxt.textareaIdx);
}
function renderTxtsOnCanvas(txts) {
    txts.forEach(function (txt) {
        renderTxtOnCanvas(txt);
    });
}
function renderTxtOnCanvas(txt) {
    var elCanvas = document.querySelector('#meme-canvas');
    var ctx = elCanvas.getContext('2d');
    ctx.font = `${txt.size}px ${txt.font}`;
    ctx.fillStyle = txt.color;

    ctx.textAlign = txt.align;
    var x = getXforAlign(elCanvas.width, txt.align)
    ctx.fillText(txt.str, x, txt.line);
    ctx.lineWidth = txt.size / 35;

    if (txt.bold) ctx.strokeText(txt.str, x, txt.line);
}
function onInpTextarea(elTextarea) {
    var str = elTextarea.value;
    var textareaIdx = +elTextarea.dataset.idx;
    var lastIdxTxt = getActiveTextareaLastTxt(textareaIdx);
    var line = lastIdxTxt.line;
    var size = lastIdxTxt.size;
    var align = lastIdxTxt.align;
    var color = document.querySelector(`#textarea-color${textareaIdx}`).value;
    var font = lastIdxTxt.font;
    var bold = lastIdxTxt.bold;

    assignTxt({
        str: str,
        line: line,
        size: size,
        align: align,
        color: color,
        font: font,
        textareaIdx: textareaIdx,
        bold: bold
    });
}

function showFontMenu(idx) {
    document.querySelector(`.font-pick${idx}`).classList.toggle('hide');
}
function onUpdateTxtBy(param, idx, type) {
    var elTextarea = document.querySelector(`#textarea${idx}`);
    if (!elTextarea.value) return;
    updateTxtAt(param, idx, type);
}

function renderTextarea(idx, add = false) {
    var length = getTxtsLength();
    if (add) {
        var textareaVal = document.querySelector('.add-line-container textarea').value;
    }
    if (idx === -1 || idx > length || textareaVal === '') return;
    var txt = getActiveTextareaLastTxt(idx); //
    var str = txt.str;
    var color = txt.color;
    var bold = '';
    if (!txt.bold) bold = 'no-bold'

    var strHtml = `<div class="add-line-container flex column" id="add-line${idx}">
    <textarea data-idx="${idx}" id="textarea${idx}" oninput="onInpTextarea(this)" onfocus="onInpTextarea(this)" placeholder="Enter Text" value="${str}">${str}</textarea>
    <div class="ctrl-btns-container flex">
    <button class="ctrl-btn btn ctrl-color">
    <input type="color" value="${color}" id="textarea-color${idx}" oninput="onUpdateTxtBy('color', ${idx}, this.value)">
    </button>
    <button class="ctrl-btn btn ctrl-font-inc fas fa-plus-square" onclick="onUpdateTxtBy('fontInc', ${idx})"></button>
    <button class="ctrl-btn btn ctrl-font-dec fas fa-minus-square" onclick="onUpdateTxtBy('fontDec', ${idx})"></button>
    <button class="ctrl-btn btn ctrl-font fas fa-font" onclick="showFontMenu(${idx})"></button>
    <button class="ctrl-btn btn ctrl-up fas fa-chevron-circle-up" onclick="onUpdateTxtBy('up', ${idx})"></button>
    <button class="ctrl-btn btn ctrl-down fas fa-chevron-circle-down" onclick="onUpdateTxtBy('down', ${idx})"></button>
    
    <button class="ctrl-btn btn ctrl-bold ${bold} fas fa-bold" onclick="onUpdateTxtBy('bold', ${idx})"></button>
    <button class="ctrl-btn btn ctrl-left fas fa-align-left" onclick="onUpdateTxtBy('left', ${idx})"></button>
    <button class="ctrl-btn btn ctrl-center fas fa-align-center" onclick="onUpdateTxtBy('center', ${idx})"></button>
    <button class="ctrl-btn btn ctrl-right fas fa-align-right" onclick="onUpdateTxtBy('right', ${idx})"></button>
    </div>
    <ul class="clean-list font-pick-bar font-pick${idx} hide flex">
    <li class="pick-impact" onclick="onUpdateTxtBy('font', ${idx} ,'Impact')">Impact</li>
    <li class="pick-arial" onclick="onUpdateTxtBy('font', ${idx} ,'Arial')">Arial</li>
    <li class="pick-times-nr" onclick="onUpdateTxtBy('font', ${idx} ,'Times New Roman')">Times NR.</li>
    </ul>
    </div>
    </div> 
    `;

    var elTextareaContainer = document.querySelector('.add-line-container');
    elTextareaContainer.innerHTML = strHtml;

    strHtml =
        `<button class="btn browse-btn" onclick="renderTextarea(${idx - 1});">Previous line</button>
    <span class="show-curr-line">${idx + 1}</span>
    <button class="btn browse-btn" onclick="renderTextarea(${idx + 1}, true)">Next line / <i class="fas fa-plus-circle"></i></button>`;

    var elBrowseTxtsContainer = document.querySelector('.browse-txts-container');
    elBrowseTxtsContainer.innerHTML = strHtml;
}
function onDownloadImg(elLink, filename = 'meme.png') {
    filename = prompt('Enter File Name:');
    setCanvas(getMemeTxts());
    elLink.href = document.querySelector('#meme-canvas').toDataURL();
    elLink.download = filename;
}

function renderFrag(idx) {
    var elCanvas = document.querySelector('#meme-canvas');
    var ctx = elCanvas.getContext('2d');
    var txt = getMemeTxts()[idx];
    var line = txt.line;
    var size = txt.size;
    ctx.strokeRect(15, line - size, ctx.canvas.width - 25, size + 13)
}
function fbFeature(elFbBtn) {
    elFbBtn.classList.add('hide');
    document.querySelector('.share-container').classList.remove('hide');
}
function handleClickOnCanvas(ev) {
    var y = ev.clientY;
    var x = ev.clientX;
    var idx = getMouseMatchTxtIdx(x, y);
    if (idx !== -1) renderTextarea(idx);
}



// Translation:

function onSetLang(lang) {
    setLang(lang);
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
    render();
}
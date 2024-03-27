'use strict';

import Subscriber from '../script/Subscriber.js';
const textarea = document.querySelector('.text-area');
const feed = document.querySelector('.post-feed');
const postButton = document.querySelector('.post-button');
const fileInput = document.getElementById('file-input');
const fileInputLabel = document.querySelector('.file-label');
const fileName = document.querySelector('.file-name');
let subscriber = createUser();


function createUser() {
    return new Subscriber(
        3928,
        'Chase Swedlo',
        '@cswed',
        'chaseswedlo@outlook.com',
        ['Page1', 'Page2', 'Page3'],
        ['Music', 'Java', 'Movies'],
        true
    );
}

let postTitle = '';
let postContent = '';
let post = '';
let imageDataUrl = '';
let pfp = `<img src='./assets/media/pfp1.png' alt="pfp">`;
function buildPost() {
    let name = `<h3>${subscriber.name}</h3>`;
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const date = new Date().toLocaleDateString('en-EN', options);
    let dateHTML = `<p>${date}</p>`;
    postTitle = `<div class="post-title"><div class="post-pfp">${pfp}${name}</div>${dateHTML}</div>`;
    let text = textarea.value.trim();
    if(text !== '' && imageDataUrl === '') {
        postContent = `<p>${text}</p>`;
    }
    else if(text !== '' && imageDataUrl !== '') {
        postContent = `<p>${text}</p><img src="${imageDataUrl}" alt="img">`;
    }
    else if(text === '' && imageDataUrl !== '') {
        postContent = `<img src="${imageDataUrl}" alt="img">`;
    }
    else {
        postContent = ``;
    }
    if(postContent !== '')
        post = `<div class="post">${postTitle}${postContent}</p>`;
    else 
        post = '';
}

function clear() {
    postTitle = '';
    postContent = '';
    post = '';
    imageDataUrl = '';
    textarea.value = '';
    fileName.innerText = '';
    
}

postButton.addEventListener('click', () => {
    buildPost();
    let current = feed.innerHTML;
    feed.innerHTML = post;
    feed.innerHTML += current;
    clear();
});

fileInput.addEventListener('change', (event) =>{
    let file = event.target.files[0];
    let reader = new FileReader();
    fileName.innerText = file ? file.name : '';
    reader.onload = function(event) {
        imageDataUrl = event.target.result;
        console.log(imageDataUrl);
    };
    reader.readAsDataURL(file);
});

fileInputLabel.addEventListener('click', function() {
    fileInput.click();
});

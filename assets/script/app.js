'use strict';

import Subscriber from '../script/Subscriber.js';
const textarea = document.querySelector('.text-area');
const feed = document.querySelector('.post-feed');
const postButton = document.querySelector('.post-button');
const fileInput = document.getElementById('file-input');
const fileInputLabel = document.querySelector('.file-label');
const fileName = document.querySelector('.file-name');
const fullName = document.querySelector('.fname');
const userName = document.querySelector('.user');
const userId = document.querySelector('.id');
const email = document.querySelector('.email');
const infoButton = document.querySelector('.pfp-button');
const infoDiv = document.querySelector('.info');
const monetize = document.querySelector('.monetize');
const pageOne = document.querySelector('.p-one');
const pageTwo = document.querySelector('.p-two');
const pageThree = document.querySelector('.p-three');
const groupOne = document.querySelector('.g-one');
const groupTwo = document.querySelector('.g-two');
const groupThree = document.querySelector('.g-three');
let subscriber = createUser();

function createUser() {
    return new Subscriber(
        3928, 
        'Chase Swedlo', 
        '@cswed', 
        'chaseswedlo@outlook.com', 
        ['Profile', 'Settings', 'Explore'], 
        ['Music', 'Java', 'Movies'], 
        true
    );
}

function setInfo() {
    let info = subscriber.getInfo();
    fullName.innerText = info.Name;
    userName.innerText = info.UserName;
    userId.innerText = info.ID;
    email.innerText = info.Email;
    if(info.Monetization) {
        monetize.innerText = 'Monetization Avalible';
        monetize.style.backgroundColor = 'rgba(30, 255, 0, 0.11)';
    }
    else {
        monetize.innerText = 'Monetization Unavalible';
        monetize.style.backgroundColor = 'rgba(255, 31, 0, 0.11)';
    }
    pageOne.innerText = info.Pages[0];
    pageTwo.innerText = info.Pages[1];
    pageThree.innerText = info.Pages[2];
    groupOne.innerText = info.Groups[0];
    groupTwo.innerText = info.Groups[1];
    groupThree.innerText = info.Groups[2];

}
setInfo();

infoButton.addEventListener('click', () => {
    infoDiv.classList.toggle('hidden');
});

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
    if (text !== '') {
        postContent = `<p>${text}</p>`;
        if (imageDataUrl !== '') {
            postContent += `<img src="${imageDataUrl}" alt="img">`;
        }
    } else if (imageDataUrl !== '') {
        postContent = `<img src="${imageDataUrl}" alt="img">`;
    } else {
        postContent = ``;
    }
    post = postContent !== '' ? `<div class="post">${postTitle}${postContent}</div>` : '';
}

function clear() {
    postTitle = '';
    postContent = '';
    post = '';
    imageDataUrl = '';
    textarea.value = '';
    fileName.innerText = '';
    fileInput.value = '';
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

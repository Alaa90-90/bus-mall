'use strict';

let photos = document.getElementById('img-border');

let imgone = document.getElementById('left-img');
let imgtwo = document.getElementById('mid-img');
let imgthree = document.getElementById('right-img');
let press;

// console.log(photos);

let maxTry = 25;
let userTry = 0;

let lindex;
let mindex;
let rindex;


let userSelection = [];

function Choice(product, src) {
    this.product = product;
    this.source = src;
    this.numShown = 0;
    this.votes = 0;

    userSelection.push(this);
}



new Choice('bag', 'img/bag.jpg');
new Choice('banana', 'img/banana.jpg');
new Choice('bathroom', 'img/bathroom.jpg');
new Choice('boots', 'img/boots.jpg');
new Choice('breakfast', 'img/breakfast.jpg');
new Choice('bubblegum', 'img/bubblegum.jpg');
new Choice('chair', 'img/chair.jpg');
new Choice('cthulhu', 'img/cthulhu.jpg');
new Choice('dog-duck', 'img/dog-duck.jpg');
new Choice('dragon', 'img/dragon.jpg');
new Choice('pen', 'img/pen.jpg');
new Choice('pet-sweep', 'img/pet-sweep.jpg');
new Choice('scissors', 'img/scissors.jpg');
new Choice('shark', 'img/shark.jpg');
new Choice('sweep', 'img/sweep.png');
new Choice('tauntaun', 'img/tauntaun.jpg');
new Choice('unicorn', 'img/unicorn.jpg');
new Choice('water-can', 'img/water-can.jpg');
new Choice('wine-glass', 'img/wine-glass.jpg');

// console.log(userSelection);

function randomchoice() {
    return Math.floor(Math.random() * userSelection.length)
}
// console.log(randomchoice());



function render() {

    lindex = randomchoice();
    mindex = randomchoice();
    rindex = randomchoice();


    while (lindex === mindex || lindex === rindex || mindex === rindex) {

        lindex = randomchoice();
        mindex = randomchoice();

    }

    imgone.src = userSelection[lindex].source;
    // console.log(imgone.src);
    imgtwo.src = userSelection[mindex].source;
    imgthree.src = userSelection[rindex].source;

    userSelection[lindex].numShown++;
    userSelection[mindex].numShown++;
    userSelection[rindex].numShown++;

    // console.log(lindex);
    // console.log(mindex);
    // console.log(rindex);
}

render();

// console.log(userSelection[lindex]);
// console.log(userSelection[mindex]);
// console.log(userSelection[rindex]);



imgone.addEventListener('click', userClick);
imgtwo.addEventListener('click', userClick);
imgthree.addEventListener('click', userClick);

// photos.addEventListener('click', userClick)


function userClick(event) {
    userTry++;

    if (userTry < maxTry) {
        if (event.target.id === 'left-img') {
            userSelection[lindex].votes++;
            // userSelection[lindex].numShown++;
            // console.log(userSelection[lindex]);
        } else if (event.target.id === 'mid-img') {
            userSelection[mindex].votes++;
            // userSelection[lindex].numShown++;
            // console.log(userSelection[mindex]);

        } else {
            userSelection[rindex].votes++;
            // userSelection[lindex].numShown++;
            // console.log(userSelection[rindex]);

        }
        render();

    } else {

         press = document.getElementById('result');
        press.addEventListener('click', report);

       


    }

    


}





function report() {

    let list = document.getElementById('survey-result');

    for (let i = 0; i < userSelection.length; i++) {
        let listItems = document.createElement('li');
        list.appendChild(listItems);
        listItems.textContent = `${userSelection[i].product} has ${userSelection[i].votes} and it is appear ${userSelection[i].numShown} times on the user screen !`;
    }
    press.removeEventListener('click', report);

}

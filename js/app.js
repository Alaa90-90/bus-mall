'use strict';

let photos = document.getElementById('img-border');

let imgone = document.getElementById('left-img');
let imgtwo = document.getElementById('mid-img');
let imgthree = document.getElementById('right-img');

let maxTry = 25;
let userTry = 0;

let lindex;
let mindex;
let rindex;
let press;

let userSelection = [];
let nameShow = [];
let timesvote = [];
let timesShown = [];

function Choice(product, src) {
    this.product = product;
    this.source = src;
    this.votes = 0;
    this.numShown = 0;
    Choice.all.push(this);
    userSelection.push(this);
    nameShow.push(this.product);

}
Choice.all = [];
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

function randomchoice() {
    return Math.floor(Math.random() * userSelection.length)
}

function render() {

    lindex = randomchoice();
    mindex = randomchoice();
    rindex = randomchoice();

    while (lindex === mindex || lindex === rindex || mindex === rindex) {

        lindex = randomchoice();
        mindex = randomchoice();
    }

    imgone.src = userSelection[lindex].source;
    imgtwo.src = userSelection[mindex].source;
    imgthree.src = userSelection[rindex].source;

    userSelection[lindex].numShown++;
    userSelection[mindex].numShown++;
    userSelection[rindex].numShown++;
}

render();

imgone.addEventListener('click', userClick);
imgtwo.addEventListener('click', userClick);
imgthree.addEventListener('click', userClick);

function userClick(event) {

    userTry++;

    if (userTry <= maxTry) {
        if (event.target.id === 'left-img') {
            userSelection[lindex].votes++;
       
        } else if (event.target.id === 'mid-img') {
            userSelection[mindex].votes++;
         
        } else {
            userSelection[rindex].votes++;
         
        }

        render();

    } else {
        press = document.getElementById('result');
        press.addEventListener('click', report);
    }
}

function showChart() {

    // const labels = Utils.months({count: 7});
    const data = {
        labels: nameShow,
        datasets: [{
            axis: 'y',
            label: '(Vote nu.)',
            data: timesvote,
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }, {
            axis: 'y',
            label: '(Shown nu.)',
            data: timesShown,
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
        }
    };


    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function report() {

    let list = document.getElementById('survey-result');

    for (let i = 0; i < userSelection.length; i++) {

        let listItems = document.createElement('li');
        list.appendChild(listItems);
        listItems.textContent = `${userSelection[i].product} has ${userSelection[i].votes} votes and it is appear ${userSelection[i].numShown} times on the user screen !`;

        timesvote.push(Choice.all[i].votes);
        timesShown.push(Choice.all[i].numShown);
    }
        showChart();

    press.removeEventListener('click', report);

}



let stringarray=[];
let newArray=[];

function storing() {
    let stringarray = JSON.stringify(Choice.all);
    localStorage.setItem('testing', stringarray);
}
function getStoring() {
    let data = localStorage.getItem('testing');
    let parsedarray = JSON.parse(data)
if (parsedarray !== null) {
    let newArray = JSON.parse(data)
    Choice.all = newArray
}
}


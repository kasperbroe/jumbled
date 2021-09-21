const allLevelBtns = document.querySelector(".level-container");
const level1Btn = document.getElementById('select-level1');
const level2Btn = document.getElementById('select-level2');
const container = document.querySelector('.jumble');
const nextBtn = document.getElementById('next-btn');
const levelUp = document.querySelector('.level-end');
const dragDrop = document.getElementById('drag');
const buttonClick = document.getElementById('check-btn');
const newLevel = document.getElementById('levelUp');
const startBtn = document.getElementById('start-btn');

levelUp.style.display = 'none';
nextBtn.style.display = 'none';
let score = 0;

new Sortable(dragDrop, {
    swapThreshold: 0.10,
    animation: 250,
});

//window.addEventListener('DOMContentLoaded', () => renderJumbles1());


const renderJumbles1 = async () => {

    let uri = 'http://localhost:3000/jumbles1';
    const res = await fetch(uri);
    const jumbles = await res.json();
    console.log(jumbles);
    let i = 0;



    function showNextJumble1() {
        nextBtn.addEventListener('click', showNextJumble1);
        nextBtn.style.display = 'none';
        let template = '';

        if (i < jumbles.length) {
            template += `
            <p class="sentence" id="1a">${jumbles[i].sentence1}</p>
            <p class="sentence" id="1b">${jumbles[i].sentence2}</p>
            <p class="sentence" id="1c">${jumbles[i].sentence3}</p>
            `
            container.innerHTML = template;

            for (var index = container.children.length; index >= 0; index--) {
                container.appendChild(container.children[Math.random() * index | 0]);
            }
            i++;
            console.log("level1 index is " + i);
            buttonClick.addEventListener('click', checkPlacement);
        } else {
            console.log(jumbles[i] + " > greetings from l1");
            levelUp.style.display = 'block';
            return;
        }
    }
    showNextJumble1();
};


level1Btn.addEventListener('click', function startLevel1() {
    allLevelBtns.style.display = 'none';
    renderJumbles1();
})



//-----------------------------------------LEVEL TWO----------------------------------------------

const renderJumbles2 = async () => {
    levelUp.style.display = 'none';

    let uri = 'http://localhost:3000/jumbles2';
    const res = await fetch(uri);
    const jumbles = await res.json();
    console.log(jumbles);
    let i = 0;

    console.log("level2 index is " + i);

    function showNextJumble2() {
        nextBtn.addEventListener('click', showNextJumble2);
        nextBtn.style.display = 'none';
        let template = '';

        if (i < jumbles.length) {
            template += `
            <p class="sentence" id="1a">${jumbles[i].sentence1}</p>
            <p class="sentence" id="1b">${jumbles[i].sentence2}</p>
            <p class="sentence" id="1c">${jumbles[i].sentence3}</p>
            <p class="sentence" id="1d">${jumbles[i].sentence4}</p>

            `
            container.innerHTML = template;

            for (var index = container.children.length; index >= 0; index--) {
                container.appendChild(container.children[Math.random() * index | 0]);
            }
            i++;
            buttonClick.addEventListener('click', checkPlacement);
        } else {
            i = null;
            console.log(jumbles[i]);
            levelUp.style.display = 'block';
            nextBtn.removeEventListener('click', showNextJumble2);
        }
    }
    return showNextJumble2();
}

levelUp.addEventListener('click', renderJumbles2);

level2Btn.addEventListener('click', function startLevel2() {
    allLevelBtns.style.display = 'none';
    renderJumbles2();
});

//----------------------------------------- CHECK ----------------------------------------------


function checkPlacement() {

    const sentA = document.getElementById("1a");
    const sentB = document.getElementById("1b");
    const sentC = document.getElementById("1c");
    const sentD = document.getElementById("1d");

    if (sentA.offsetTop < sentB.offsetTop && sentB.offsetTop < sentC.offsetTop) {
        console.log("WORKS");
        score++;
        console.log(score);
        buttonClick.removeEventListener('click', checkPlacement);
        nextBtn.innerHTML = 'NEXT'; nextBtn.style.display = 'block';
    } else if (sentA.offsetTop < sentB.offsetTop && sentB.offsetTop < sentC.offsetTop && sentC.offsetTop < sentD.offsetTop) {
        console.log("WORKS");
        score++;
        console.log(score);
        buttonClick.removeEventListener('click', checkPlacement);
        nextBtn.innerHTML = 'NEXT'; nextBtn.style.display = 'block';
    }
    else {
        console.log("DARN!");
    }
}

    // NOTE TO SELF: check virker, hvis funktionen placeres, hvor sætningerne importeres//



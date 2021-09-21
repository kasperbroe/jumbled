const timeAndScore = document.getElementById('top-container');
const myBackground = document.querySelector('.background1')
const modal = document.getElementById('myModal');
const level1Btn = document.getElementById('select-level1');
const level2Btn = document.getElementById('select-level2');
const level3Btn = document.getElementById('select-level3');
const countDown = document.getElementById('time-left')
const container = document.querySelector('.jumble');
const nextBtn = document.getElementById('next-btn');
const reloadBtn = document.getElementById('reload-btn');
const dragDrop = document.getElementById('drag');
const checkJumble = document.getElementById('check-btn');
const backBtn = document.getElementById('back-btn');
const startBtn = document.getElementById('start-btn');
const total = document.getElementById('score-total');
const counter = document.querySelector(".counter");
const bonusMessage = document.querySelector(".bonus-number");
const starContainer = document.getElementById('containerStar')
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
const star4 = document.getElementById('star4');
const star5 = document.getElementById('star5');
const bonus1 = document.getElementById('bonus1');
const bonus2 = document.getElementById('bonus2');
const bonus3 = document.getElementById('bonus3');
const bonus4 = document.getElementById('bonus4');
const bonus5 = document.getElementById('bonus5');
const elem = document.getElementById("myBar");
let levelCount = 0;
let width = 1;
let score = 0;
let time = 60;

timeAndScore.style.visibility = 'hidden';
checkJumble.style.visibility = 'hidden';
reloadBtn.style.visibility = 'hidden';

new Sortable(dragDrop, {
    swapThreshold: 0.10,
    animation: 250,
});

function updateCountdown() {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds
    countDown.innerHTML = `${minutes}:${seconds}`
    time--
    if (time < 20) {
        countDown.style.color = "#d23723";
    }
    if (time < 0) {
        clearInterval(myInterval)
    }
    return;
}

function levelLoad() {
    levelCount++
    width = 1;
    myInterval = setInterval(updateCountdown, 1000)
    star1.style.visibility = 'hidden';
    star2.style.visibility = 'hidden';
    star3.style.visibility = 'hidden';
    star4.style.visibility = 'hidden';
    star5.style.visibility = 'hidden';
    bonus1.style.visibility = 'hidden';
    bonus2.style.visibility = 'hidden';
    bonus3.style.visibility = 'hidden';
    bonus4.style.visibility = 'hidden';
    bonus5.style.visibility = 'hidden';
    checkJumble.style.visibility = 'visible';
    timeAndScore.style.visibility = 'visible';
    modal.style.display = "none";
    myBackground.style.display = "none";
    level1Btn.style.display = 'none';
    level2Btn.style.display = 'none';
    level3Btn.style.display = 'none';
}

const renderJumbles = async () => {
    let uri = 'http://localhost:3000/jumbles';
    const res = await fetch(uri);
    const data = await res.json();
    let i = 0;

    level1Btn.onclick = function showNextJumble1() {
        levelLoad();
        time = 60
        nextBtn.addEventListener('click', showNextJumble1);
        let template = '';

        if (i < data[0].easy.length) {
            template += `
            <p class="sentence" id="1a">${data[i].easy[0]}</p>
            <p class="sentence" id="1b">${data[i].easy[1]}</p>
            <p class="sentence" id="1c">${data[i].easy[2]}</p>
            `
            container.innerHTML = template;
            for (var index = container.children.length; index >= 0; index--) {
                container.appendChild(container.children[Math.random() * index | 0]);
            }
            i++;
            checkJumble.addEventListener('click', checkPlacement1);
        } else {
            i = 0;
        }
    }

    level2Btn.onclick = function showNextJumble2() {
        levelLoad();
        time = 60
        nextBtn.addEventListener('click', showNextJumble2);
        let template = '';

        if (i < data[4].moderate.length) {

            template += `
            <p class="sentence" id="1a">${data[i + 3].moderate[0]}</p>
            <p class="sentence" id="1b">${data[i + 3].moderate[1]}</p>
            <p class="sentence" id="1c">${data[i + 3].moderate[2]}</p>
            <p class="sentence" id="1d">${data[i + 3].moderate[3]}</p>
            `
            container.innerHTML = template;
            for (var index = container.children.length; index >= 0; index--) {
                container.appendChild(container.children[Math.random() * index | 0]);
            }
            i++;
            checkJumble.addEventListener('click', checkPlacement2);
        } else {
            i = 0;
        }
    }

    level3Btn.onclick = function showNextJumble3() {
        levelLoad();
        time = 60
        nextBtn.addEventListener('click', showNextJumble3);
        let template = '';

        if (i < data[6].hard.length) {
            template += `
            <p class="sentence" id="1a">${data[i + 6].hard[0]}</p>
            <p class="sentence" id="1b">${data[i + 6].hard[1]}</p>
            <p class="sentence" id="1c">${data[i + 6].hard[2]}</p>
            <p class="sentence" id="1d">${data[i + 6].hard[3]}</p>
            <p class="sentence" id="1e">${data[i + 6].hard[4]}</p>
            `
            container.innerHTML = template;

            for (var index = container.children.length; index >= 0; index--) {
                container.appendChild(container.children[Math.random() * index | 0]);
            }
            i++;
            checkJumble.addEventListener('click', checkPlacement3);
        } else {
            i = 0;
        }
    }
};

window.addEventListener('DOMContentLoaded', () => renderJumbles());

backBtn.onclick = function () {
    location.reload();
};

function counterPoints() {
    let myCount = 1;
    setInterval(() => {
        if (myCount < score * 2) {
            myCount++;
            counter.innerHTML = myCount;
        }
    }, 6);
}

let bonus = 0;

function bonusScore() {

    if (score > 25) {
        bonus = 50;
        bonusMessage.innerHTML = bonus;
    } if (score > 25) {
        bonus = 100;
        bonusMessage.innerHTML = bonus;
    } if (score > 30) {
        bonus = 150;
        bonusMessage.innerHTML = bonus;
    } if (score > 40) {
        bonus = 200;
        bonusMessage.innerHTML = bonus;
    } if (score > 50) {
        bonus = 250;
        bonusMessage.innerHTML = bonus;
    } else {
        bonus = 0;
        bonusMessage.innerHTML = bonus;

    }
};

function levelTotal() {
    if (levelCount === 1) {
        firstlevelBonus = score + bonus;
        total.innerHTML = firstlevelBonus;
    } else if (levelCount === 2) {
        secondlevelBonus = (score + bonus) + firstlevelBonus;
        total.innerHTML = secondlevelBonus;
    } else if (levelCount === 3) {
        thirdlevelBonus = (score + bonus) + secondlevelBonus;
        total.innerHTML = thirdlevelBonus;
    }
}

function progressBar(levelSeconds) {
    const id = setInterval(frame, 6);

    function frame() {
        if (width >= (score / levelSeconds) * 100) {
            clearInterval(id);
            return;
        } else {
            width++;
            elem.style.width = width + "%";

            if (width >= 25 && width <= 49) {
                star1.style.visibility = "visible"
                bonus1.style.visibility = "visible"
            } else if (width >= 50 && width <= 59) {
                star2.style.visibility = "visible"
                bonus2.style.visibility = "visible"
            } else if (width >= 60 && width <= 69) {
                star3.style.visibility = "visible"
                bonus3.style.visibility = "visible"
            } else if (width >= 70 && width <= 79) {
                star4.style.visibility = "visible"
                bonus4.style.visibility = "visible"
            } else if (width >= 80 && width <= 100) {
                star5.style.visibility = "visible"
                bonus5.style.visibility = "visible"
            }
        }
    }
}

function reloadGame() {
    elem.style.visibility = 'visible';
    clearInterval(myInterval);
    modal.style.display = "none";
    myBackground.style.display = "none";
    myInterval = setInterval(updateCountdown, 1000)
}

function wrongAnswer() {
    document.querySelector('.modal').style.background = "rgba(130, 14, 33, 0.5)"
    nextBtn.style.visibility = 'hidden';
    reloadBtn.style.visibility = 'visible';
    bonus = 0;
    score = 0;
    bonusMessage.innerHTML = bonus;
    counter.innerHTML = score;
    elem.style.visibility = 'hidden';
    reloadBtn.addEventListener('click', reloadGame)
}

function checkPlacement1() {
    clearInterval(myInterval);
    modal.style.display = "block";
    myBackground.style.display = "block";

    const sentA = document.getElementById("1a");
    const sentB = document.getElementById("1b");
    const sentC = document.getElementById("1c");

    if (sentA.offsetTop < sentB.offsetTop && sentB.offsetTop < sentC.offsetTop) {
        score = (time + 1)
        checkJumble.removeEventListener('click', checkPlacement1);
        reloadBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'visible';
        myBackground.style.display = "block";
        modal.style.background = "rgba(14, 136, 235, 0.5)";
        counterPoints();
        bonusScore();
        levelTotal()
        progressBar(60);
    } else {
        wrongAnswer();
    }
}

function checkPlacement2() {
    clearInterval(myInterval);
    modal.style.display = "block";
    myBackground.style.display = "block";

    const sentA = document.getElementById("1a");
    const sentB = document.getElementById("1b");
    const sentC = document.getElementById("1c");
    const sentD = document.getElementById("1d");

    if (sentA.offsetTop < sentB.offsetTop && sentB.offsetTop < sentC.offsetTop && sentC.offsetTop < sentD.offsetTop) {
        score = (time + 1)
        checkJumble.removeEventListener('click', checkPlacement2);
        reloadBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'visible';
        myBackground.style.display = "block";
        modal.style.background = "rgba(14, 136, 235, 0.5)";
        counterPoints();
        bonusScore();
        levelTotal()
        progressBar(60);
    } else {
        wrongAnswer();
    }
}

function checkPlacement3() {
    clearInterval(myInterval);
    modal.style.display = "block";
    myBackground.style.display = "block";

    const sentA = document.getElementById("1a");
    const sentB = document.getElementById("1b");
    const sentC = document.getElementById("1c");
    const sentD = document.getElementById("1d");
    const sentE = document.getElementById("1e");

    if (sentA.offsetTop < sentB.offsetTop && sentB.offsetTop < sentC.offsetTop && sentC.offsetTop < sentD.offsetTop && sentD.offsetTop < sentE.offsetTop) {
        score = (time + 1)
        checkJumble.removeEventListener('click', checkPlacement3);
        reloadBtn.style.visibility = 'hidden';
        nextBtn.style.visibility = 'visible';
        myBackground.style.display = "block";
        modal.style.background = "rgba(14, 136, 235, 0.5)";
        counterPoints();
        bonusScore();
        levelTotal()
        progressBar(60);
    } else {
        wrongAnswer();
    }
}

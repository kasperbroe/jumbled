const jumbleContainer = document.querySelector('.jumble');

const renderJumbles1 = async () => {

    let uri = 'http://localhost:3000/jumbles1';

    const res = await fetch(uri);
    const jumbles = await res.json();
    console.log(jumbles);


    let i = 0;
    let template = '';

    if (i < jumbles.length) {
        template += `
            <p class="sentence" draggable="true" id="1a">${jumbles[i].sentence1}</p>
            <p class="sentence" draggable="true" id="1b">${jumbles[i].sentence2}</p>
            <p class="sentence" draggable="true" id="1c">${jumbles[i].sentence3}</p>
            `
        jumbleContainer.innerHTML = template;

    } else {
        console.log(jumbles[i]);
        levelUp.style.display = 'block';

    }
}

window.addEventListener('DOMContentLoaded', () => renderJumbles1());



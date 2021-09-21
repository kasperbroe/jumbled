const container = document.querySelector('.jumble');

const renderPosts = async () => {

    //URI (Uniform Resource Identifier) let uri is equal to our END POINT from the server!
    let uri = 'http://localhost:3000/jumbles';

    //We fecth the resources from the endpoint above and JSON-server sends that data back. 
    //await = it waits until we get back the response (res) / our data. await is used because we work asynchronous and it takes a little time to do/execute
    const res = await fetch(uri);
    const jumbles = await res.json();
    console.log(jumbles);

    //now it's time to output our json-array in the dom
    //first create a template string
    let template = '';

    //then cycle through the "posts" and fire a callback function for each post - each time we fire that function we get acces to the current post we're iterating
    jumbles.forEach(jumbles => {

        //plus-equals (+=) is to append
        template += `
            <p class="sentence" id="1a">${jumbles.sentence1}</p>
            <p class="sentence" id="1b">${jumbles.sentence2}</p>
            <p class="sentence" id="1c">${jumbles.sentence3}</p>
            `
    })
    container.innerHTML = template;
}

//When all the DOM-content has been loaded, js invokes the function renderPosts.
//renderPosts is an arrowfunction to avoid the event ?????


window.addEventListener('DOMContentLoaded', () => renderPosts());


//---------------------------------------------- DRAG DROP ----------------------------------------


const dragDrop = document.getElementById('drag');

new Sortable(dragDrop, {
    animation: 200,
    ghostClass: 'blue-background-class'
});

const buttonClick = document.getElementById('btn');
buttonClick.addEventListener('click', checkPlacement);

function checkPlacement() {
    console.log("clicked");
    const sentA = document.getElementById("1a");
    const sentB = document.getElementById("1b");
    const sentC = document.getElementById("1c");
    if (sentA.offsetTop > sentB.offsetTop && sentB.offsetTop > sentC.offsetTop) {
        console.log("WORKS");
    } else {
        console.log("DARN?!");
    }
}
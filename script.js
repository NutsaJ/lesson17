let mainWrapperPost = document.getElementById('post-block');
let overlayContent = document.getElementById('overlay');
let closeOverlay = document.getElementById('close');
let content = document.getElementById('content');
let addButton = document.getElementById('add-button');
let postOverlay = document.getElementById('post-overlay');
let form = document.getElementById('form');
let postAddButton = document.getElementById('add-overlay-button');


// sending request to server
function ajax(url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function() {
        let data = JSON.parse(request.responseText);
        callback(data);
    });

    request.send();
}


ajax('https://jsonplaceholder.typicode.com/posts', function(data) {
    printData(data);
})


function printData(data) {
    data.forEach(element => {
        createPost(element);
    });
}


// creating posts
function createPost(item) {
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('posts');
    divWrapper.setAttribute('data-id', item.id);
    
    
    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.id;

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = item.title;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('data-id', item.id);

    divWrapper.appendChild(h2Tag);
    divWrapper.appendChild(h3Tag);
    divWrapper.appendChild(deleteButton);

    mainWrapperPost.appendChild(divWrapper);

    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        divWrapper.classList.add('block-deleting')
        deletePost(id);
    });
    divWrapper.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
    });

    console.log(divWrapper);
}

// deleting posts
function deletePost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE',
    });
}

function openOverlay(id) {
    overlayContent.classList.add('active')
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    ajax(url, function(data) {
        overlayFunction(data);
    });
    console.log(id);
}


function overlayFunction(item) {
    let titlePost = document.createElement('h3');
    titlePost.innerText = item.title;
    let description = document.createElement('p');
    description.innerText = item.body;

    content.appendChild(titlePost);
    content.appendChild(description);
}

closeOverlay.addEventListener('click', function() {
    overlayContent.classList.remove('active');
    content.innerHTML = ' ';
})

addButton.addEventListener('click', function() {
    postOverlay.classList.add('active');
    document.getElementById('title').value = ' ';
    document.getElementById('Description').value = ' ';
})



// creating and adding ID to new posts

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = {
        title: event.target[0].value,
        description: event.target[1].value
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    console.log(formData);

    postOverlay.classList.remove('active');

    let addedPost = document.createElement('div');
    addedPost.classList.add('posts');
        
    let h2 = document.createElement('h2');
    h2.innerText = document.getElementById('title').value;

    let h3 = document.createElement('h3');
    h3.innerText = document.getElementById('Description').value;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';

    let addedPostId = document.createElement('h2');
    addedPostId.innerHTML = mainWrapperPost.getElementsByTagName('div').length + 1;

    addedPost.appendChild(addedPostId);
    addedPost.appendChild(h2);
    addedPost.appendChild(h3);
    addedPost.appendChild(deleteButton);

    mainWrapperPost.appendChild(addedPost);

    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        addedPost.classList.add('block-deleting')
    });
})
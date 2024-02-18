// index.js
import { displayPhoto } from './photoDisplay.js';

function loadPosts() {
    fetch('/getImages')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                displayPhoto(post.link, post.id, post.description);
            });
        })
        .catch(error => console.error('Error:', error));
}

window.onload = loadPosts;

document.getElementById('createPostButton').addEventListener('click', function() {
    const photoLink = document.getElementById('photoLink').value;
    const postDescription = document.getElementById('postDescription').value;
    const imageId = null; 
    displayPhoto(photoLink, imageId, postDescription);
    document.getElementById('photoLink').value = '';
    document.getElementById('postDescription').value = '';
});





















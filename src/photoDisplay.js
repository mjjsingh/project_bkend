// photoDisplay.js
import createCommentForm from './commentForm.js';

export function displayPhoto(photoLink, imageId, postDescription) {
    if (!photoLink) {
        photoLink = document.getElementById('photoLink').value;
    }

    const displayArea = document.getElementById('displayArea');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    displayArea.appendChild(imageDiv);

    const img = document.createElement('img');
    img.src = photoLink;
    img.style.maxWidth = '100%';
    imageDiv.appendChild(img);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = postDescription;
    imageDiv.appendChild(descriptionDiv);

    const commentForm = createCommentForm(img, imageDiv);
    const commentInput = commentForm.querySelector('#commentInput')
    imageDiv.appendChild(commentForm);

    const commentsDiv = document.createElement('div');
    imageDiv.appendChild(commentsDiv);

    const updateComments = () => {
        if (img.id) { // Check if img.id is defined
            fetch(`/getComments/${img.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(comments => {
                    commentsDiv.innerHTML = '';
                    comments.forEach(comment => {
                        const commentDiv = document.createElement('div');
                        commentDiv.textContent = comment.text;
                        commentsDiv.appendChild(commentDiv);
                    });
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        } else {
            console.error('Image ID is undefined');
        }
    };

    if (imageId) {
        img.id = imageId;
    }

    if (!imageId) {
        fetch('/saveImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({link: photoLink, description: postDescription}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            img.id = data.imageId;
            updateComments();  // Update comments after img.id is set
        });
    } else {
        updateComments();  // If imageId is provided, update comments immediately
    }

    // Add the event listener for the comment form's submit event
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting via the browser

        fetch('/saveComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageId: img.id,
                text: commentInput.value
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            commentInput.value = '';
            updateComments();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    });
}










